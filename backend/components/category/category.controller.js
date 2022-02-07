const { models } = require('../../utils/sequelize');
const sequelize = require('sequelize');
const { getIdParam, getDataOne } = require('../../utils/helpers');

// get all categories of user in session
async function getAll(req, res, next) {
  const { withOperations } = req.query;
  const { id: userId } = req.user;
  try {
    const categories = await models.Category.findAll({
      where: { userId },
      include: withOperations ? 'Operations' : [],
      attributes: {
        // include: [
        //   [sequelize.fn('sum', sequelize.col('Operations.amount')), 'category_balance'],
        // ],
        include: [
          [
            sequelize.literal(
              '(SELECT sum(Operations.amount) FROM Operations WHERE Operations.categoryId=Category.id)'
            ),
            'category_balance',
          ],
        ],
      },
    });
    res.json({ categories });
  } catch (error) {
    next(error);
  }
}

// get info categoria and all operations relationated with query values
async function getById(req, res, next) {
  const { id: userId } = req.user;
  try {
    const id = await getIdParam(req);
    const category = await getDataOne(models.Category, {
      where: { id, userId },
      // subQuery: false,
      include: ['Operations'],
      attributes: {
        // include: [
        //   [sequelize.fn('sum', sequelize.col('Operations.amount')), 'totalAmount'],
        // ],
        include: [
          [
            sequelize.literal(
              '(SELECT sum(Operations.amount) FROM Operations WHERE Operations.categoryId=Category.id)'
            ),
            'category_balance',
          ],
          [
            sequelize.literal(
              '(SELECT sum(Operations.amount) FROM Operations WHERE Operations.categoryId=Category.id AND Operations.type="egreso")'
            ),
            'category_egreso',
          ],
          [
            sequelize.literal(
              '(SELECT sum(Operations.amount) FROM Operations WHERE Operations.categoryId=Category.id AND Operations.type="ingreso")'
            ),
            'category_ingreso',
          ],
        ],
      },
      // group: ['Operations.amount', 'Operations.id'],
    });
    return res.json({ category });
  } catch (error) {
    next(error);
  }
}

// only create new category for user
async function createOne(req, res, next) {
  const { id: userId } = req.user;
  const { name } = req.body;

  try {
    const newCategory = await models.Category.create({ name, userId });
    res.status(201).json({ message: 'Guardado Correctamente', category: newCategory });
  } catch (error) {
    next(error);
  }
}

// update any category only user created
async function updateOne(req, res, next) {
  const { name } = req.body;
  const { id: userId } = req.user;

  try {
    const id = await getIdParam(req);
    const category = await getDataOne(models.Category, { where: { id, userId } });
    category.name = name;
    await category.save();
    res.json({ message: 'Actualizado Correctamente', category });
  } catch (error) {
    next(error);
  }
}

async function deleteOne(req, res, next) {
  const { id: userId } = req.user;
  try {
    const id = await getIdParam(req);
    const deleteItem = await getDataOne(models.Category, { where: { id, userId } });
    await deleteItem.destroy();
    res.json({ message: 'Categoria eliminada', category: deleteItem });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
  getById,
  createOne,
  updateOne,
  deleteOne,
};
