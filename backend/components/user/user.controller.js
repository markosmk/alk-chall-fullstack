const { models } = require('../../utils/sequelize');
const { getDataOne } = require('../../utils/helpers');

/************* Only Admin *******************/

async function getAll(req, res, next) {
  /**
  FIXME: Only for Admin
   */
  try {
    const users = await models.User.findAll();
    res.json({ users });
  } catch (error) {
    next(error);
  }
}

async function createOne(req, res, next) {
  // FIXME: validar informacion / y solo es para Admins
  try {
    const user = new models.User(req.body);
    // user.date = Date.now();
    user.date = new Date(req.body.date);
    await user.save();
    res.status(201).json({ message: 'Usuario Creado Correctamente', user });
  } catch (error) {
    next(error);
  }
}
/************* Only Admin *******************/

async function getById(req, res, next) {
  const { id } = req.user;
  try {
    const user = await getDataOne(models.User, {
      where: { id },
      include: ['Operations', 'Categories'],
    });
    return res.json({ user });
  } catch (error) {
    next(error);
  }
}

async function updateOne(req, res, next) {
  const { id } = req.user;
  const data = req.body;
  try {
    const user = await getDataOne(models.User, { where: { id } });
    // no update password if empty
    // // if (!data.password) {
    // const { password, ...filteredData } = data;
    // Object.assign(user, filteredData);
    Object.assign(user, data);
    // user.name = name;
    // user.email = email;
    await user.save();
    // user.name = data.name;

    res.json({ message: 'Actualizado Correctamente', user });
  } catch (error) {
    next(error);
  }
}

async function deleteOne(req, res, next) {
  try {
    const id = await getIdParam(req);
    // check if is the same id
    if (id !== req.user.id) throw new Error('No es posible continuar con la peticion.');
    const user = await getDataOne(models.User, { where: { id } });
    await user.destroy();
    res.json({ message: 'Usuario eliminado' });
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
