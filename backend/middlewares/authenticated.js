const { verifyToken } = require('../utils/jwt');

const validateRequest = async (req, res, next) => {
  try {
    // const accessToken = req.cookies['access-token']; // por cookies
    // const headToken = req.headers['x-access-token']; // api node
    const auth = req.headers['authorization'];
    const token = auth?.replace('Bearer ', '');
    if (!token)
      return res.status(403).json({
        message: 'No se puede procesar la solicitud requerida',
        error: 'InvalidToken',
        status: 403,
        data: null,
      });

    const validToken = await verifyToken(token);
    if (validToken) {
      req.user = validToken; // true or false
      next();
    }
  } catch (error) {
    return res.status(401).json({
      message: error,
      error: 'Unauthorized',
      status: 401,
      data: null,
    });
    // return next(error);
  }
};

module.exports = {
  validateRequest,
};
