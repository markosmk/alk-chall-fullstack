const { models } = require('../../utils/sequelize');
const { checkCorrectSign, getIdParam, getDataOne } = require('../../utils/helpers');

async function getAll(req, res, next) {
  const { id: userId } = req.user;
  /**
  ?limit=10&order=desc&type=egresos&category=salary
  TODO: &search="in concept"
   * La pantalla de inicio deberá mostrar el balance actual, es decir,
   * el resultante de los ingresos y egresos de dinero cargados,
   * un listado de los últimos 10 registrados.
   */
  const { limit, order, type, category } = req.query;
  let options = { where: { userId } };
  if (limit || order || type || category) {
    if (limit) options.limit = Number(limit);
    if (order) options.order = [['createdAt', order]];
    if (type) options.where.type = type;
    if (category) options.where.categoryId = category;
  }
  try {
    const operations = await models.Operation.findAll(options);
    const balance = await models.Operation.sum('amount', { where: { userId } });
    res.json({ operations, balance });
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  const { id: userId } = req.user;
  try {
    const id = await getIdParam(req);
    const operation = await getDataOne(models.Operation, { where: { id, userId } });
    return res.json({ operation });
  } catch (error) {
    next(error);
  }
}

async function createOne(req, res, next) {
  const { id: userId } = req.user;
  // TODO: validate info, although it is still validated in the front
  // console.log(req.body);
  // FIXME: if categoryId if not created by user in session = show text error ()
  try {
    const newOperation = new models.Operation(req.body);
    newOperation.date = new Date(req.body.date); // convert datatime 2022-01-27 01:01:44
    newOperation.userId = userId;
    newOperation.amount = checkCorrectSign(req); // correct the sign amount
    console.log();
    // await newOperation.save();
    res.json({ message: 'Guardado Correctamente', operation: newOperation });
  } catch (error) {
    next(error);
  }
}

async function updateOne(req, res, next) {
  const { id: userId } = req.user;
  const data = req.body;
  const { type, ...filteredData } = data; // no update type data

  try {
    const id = await getIdParam(req);
    const operation = await getDataOne(models.Operation, { where: { id, userId } });
    Object.assign(operation, filteredData);
    await operation.save();
    res.json({ message: 'Actualizado Correctamente', operation });
  } catch (error) {
    next(error);
  }
}

async function deleteOne(req, res, next) {
  const { id: userId } = req.user;
  try {
    const id = await getIdParam(req);
    const deleteOperation = await getDataOne(models.Operation, { where: { id, userId } });
    await deleteOperation.destroy();
    res.json({ message: 'Operacion eliminada', operation: deleteOperation });
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
