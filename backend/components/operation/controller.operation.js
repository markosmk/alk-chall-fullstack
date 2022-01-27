const db = require('../../utils/mysql');

async function getAll(req, res, next) {
  /**
  ?limit=10&order=desc&type=egresos&category=salary
  TODO: &search="in concept"
   * La pantalla de inicio deberá mostrar el balance actual, es decir,
   * el resultante de los ingresos y egresos de dinero cargados,
   * un listado de los últimos 10 registrados.
   */
  const { limit, order, type, category } = req.query;
  let options = { where: {} };
  if (limit || order || type || category) {
    if (limit) options.limit = Number(limit);
    if (order) options.order = [['createdAt', order]];
    if (type) options.where.type = type;
    if (category) options.where.category = category;
  }

  try {
    const operations = await db.Operation.findAll(options);
    res.json({ operations });
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  if (!Number(req.params.id)) {
    return res.status(401).json({ message: 'Comprueba la solicitud' });
  }

  try {
    const operation = await getOperation(req.params.id);
    return res.json({ operation });
  } catch (error) {
    next(error);
  }
}

async function createOne(req, res, next) {
  // TODO: validar informacion
  try {
    const operation = new db.Operation(req.body);
    // operation.date = Date.now();
    operation.date = new Date(req.body.date);
    await operation.save();

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
    const operation = await getOperation(id);
    Object.assign(operation, filteredData);
    await operation.save();

    res.json({ status: 'Actualizado Correctamente', operation });
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
    const operation = await getOperation(id);
    await operation.destroy();
    res.json({ message: 'Operacion eliminada' });
  } catch (error) {
    next(error);
  }
}

// helper functions
async function getOperation(id) {
  const data = await db.Operation.findByPk(id);
  if (!data) throw 'Operacion no encontrada';
  return data;
}

module.exports = {
  getAll,
  getById,
  createOne,
  updateOne,
  deleteOne,
};
