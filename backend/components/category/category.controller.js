const { models } = require('../../utils/sequelize');
const { getIdParam, getDataOne } = require('../../utils/helpers');

// get all categories of user in session
async function getAll(req, res, next) {
  const { id: userId } = req.user;
  try {
    const categories = await models.Category.findAll({ where: { userId } });
    res.json({ categories });
  } catch (error) {
    next(error);
  }
}

// get info categoria and all operations relationated
async function getById(req, res, next) {
  const { id: userId } = req.user;
  try {
    const id = await getIdParam(req);
    const category = await getDataOne(models.Category, { where: { id, userId } });
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
    res.json({ status: 'Guardado Correctamente', category: newCategory });
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
    res.json({ status: 'Actualizado Correctamente', category });
  } catch (error) {
    next(error);
  }
}

async function deleteOne(req, res, next) {
  const { id: userId } = req.user;
  try {
    const id = await getIdParam(req); // status(401)
    const deleteItem = await getDataOne(models.Category, { where: { id, userId } }); // status(404)
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
