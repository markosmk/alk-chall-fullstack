const { AppError } = require('./errors');
// A helper function to assert the request ID param is valid
// and convert it to a number (since it comes as a string by default)
const getIdParam = async (req) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) throw new AppError(`Parametro recibido Invalido: "${id}"`, 400);
  return Number.parseInt(id, 10);
};

// search resource by primary key
const getDataByPk = async (id, Model) => {
  const data = await Model.findByPk(id);
  if (!data) throw new AppError('Recurso no encontrado', 404);
  return data;
};

// because it is a repetitive request, we handle it from this function
const getDataOne = async (Model, options = {}) => {
  const data = await Model.findOne(options);
  if (!data) throw new AppError('Recurso no encontrado', 404);
  return data;
};

// check type, if 'ingreso' or 'egreso' to check correct sign before save
// if type is 'ingreso' must be sign +, so if enter -3 or '-3' must save 3
// if type is 'egreso' must be sign -, so if enter 3 or '3', you must save -3
const checkCorrectSign = ({ body: { type, amount } }, typeDB = '') => {
  const typeSelect = typeDB ? typeDB : type;
  if (
    // check if egreso sign is positive or ingreso is negative, so change sign
    (typeSelect === 'egreso' && Math.sign(amount) === 1) ||
    (typeSelect === 'ingreso' && Math.sign(amount) === -1)
  ) {
    return -amount;
  }
  return amount;
};

module.exports = {
  getIdParam,
  getDataByPk,
  getDataOne,
  checkCorrectSign,
};
