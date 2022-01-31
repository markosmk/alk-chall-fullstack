const { AppError } = require('../utils/errors');
const { getIdParam } = require('../utils/helpers');

const onlyOwner = async (req, res, next) => {
  try {
    // id user to edit
    const id = await getIdParam(req);
    // check is same user session
    if (req.user && req.user.id !== id)
      throw new AppError(
        'No tienes permiso para editar este recurso, contacta al administrador',
        401
      );
    next();
  } catch (error) {
    next(error);
  }
};

const isOperationOwner = (req, res, next) => {
  const authorized = req.operation && req.operation.userId === req.user.id;
  if (!authorized)
    throw new AppError(
      'No tienes permiso para leer este recurso, contacta al administrador',
      401
    );
  next();
};

module.exports = { onlyOwner, isOperationOwner };
