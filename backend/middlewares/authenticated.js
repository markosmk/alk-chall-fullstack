const { verifyToken } = require('../utils/jwt');

const validateRequest = async (req, res, next) => {
  try {
    const auth = req.headers['authorization'];
    const token = auth?.replace('Bearer ', '');
    if (!token)
      return res.status(403).json({
        msg: 'No se puede procesar la solicitud requerida',
        error: 'InvalidToken',
        status: 403,
        data: null,
      });

    const store = await verifyToken(token);
    if (store) {
      req.user = store;
      next();
    }
  } catch (error) {
    return next(error);
    // res.status(401).json({msg: 'tu sesion ha expirado, volve a ingresar', error: 'Unauthorized: ' + error.message, status: 401, data: null})
  }
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies['access-token']; /// por cookies
  const headToken = req.headers['x-access-token'];
  if (headToken) {
    console.log('se entrego el token:', headToken);
  }
  if (!accessToken)
    return res.status(400).json({
      status: 400,
      error: 'User not authenticated!',
    });

  try {
    const validToken = verify(accessToken, jwt_secret);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (error) {
    return next(error);
    // return res.status(400).json({
    //   status: 400,
    //   error: error,
    // });
  }
};

module.exports = {
  validateRequest,
};
