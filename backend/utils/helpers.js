// A helper function to assert the request ID param is valid
// and convert it to a number (since it comes as a string by default)
const getIdParam = async (req) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) throw new Error(`Id Invalido, parametro recibido: "${id}"`);
  return Number.parseInt(id, 10);
};

// search resource by primary key
const getDataByPk = async (id, Model) => {
  const data = await Model.findByPk(id);
  if (!data) throw new Error('Recurso no encontrado');
  return data;
};

// because it is a repetitive request, we handle it from this function
const getDataOne = async (Model, options = {}) => {
  const data = await Model.findOne(options);
  if (!data) throw new Error('Recurso no encontrado');
  return data;
};

// check type, if 'ingreso' or 'egreso' to check correct sign before save
const checkCorrectSign = ({ body: { type, amount } }) => {
  if (
    (type === 'egreso' && Math.sign(amount) === 1) ||
    (type === 'ingreso' && Math.sign(amount) === -1)
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
