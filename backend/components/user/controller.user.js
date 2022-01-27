const db = require('../../utils/mysql');

async function getAll(req, res, next) {
  /**
  ?limit=10&order=desc&type=egresos&category=salary
  TODO: &search="in concept"
   * La pantalla de inicio deberá mostrar el balance actual, es decir,
   * el resultante de los ingresos y egresos de dinero cargados,
   * un listado de los últimos 10 registrados.
   */

  try {
    const users = await db.User.findAll();
    res.json({ users });
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  if (!Number(req.params.id)) {
    return res.status(401).json({ message: 'Comprueba la solicitud' });
  }

  try {
    const user = await getUser(req.params.id);
    return res.json({ user });
  } catch (error) {
    next(error);
  }
}

async function createOne(req, res, next) {
  // TODO: validar informacion
  try {
    const user = new db.User(req.body);
    // user.date = Date.now();
    user.date = new Date(req.body.date);
    await user.save();

    res.json({ status: 'Guardado Correctamente', operation });
  } catch (error) {
    next(error);
  }
}

async function updateOne(req, res, next) {
  const id = req.params.id;
  const data = req.body;
  const { type, ...filteredData } = data; // no update type data

  if (!Number(id)) {
    return res.status(401).json({ message: 'Comprueba la solicitud' });
  }

  try {
    const user = await getUser(id);
    Object.assign(user, filteredData);
    await user.save();

    res.json({ status: 'Actualizado Correctamente', user });
  } catch (error) {
    next(error);
  }
}

async function deleteOne(req, res, next) {
  if (!Number(req.params.id)) {
    return res.status(401).json({ message: 'Comprueba la solicitud' });
  }

  const id = req.params.id;

  try {
    const user = await getUser(id);
    await user.destroy();
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    next(error);
  }
}

// helper functions
async function getUser(id) {
  const data = await db.User.findByPk(id);
  if (!data) throw 'Usuario no encontrado';
  return data;
}

module.exports = {
  getAll,
  getById,
  createOne,
  updateOne,
  deleteOne,
};
