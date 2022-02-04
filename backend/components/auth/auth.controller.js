const { models } = require('../../utils/sequelize');
const { createToken } = require('../../utils/jwt');
const { AppError } = require('../../utils/errors');

async function loginUser(req, res, next) {
  const { email, password } = req.body;

  try {
    // 1 check if email exists
    const user = await models.User.scope('withPassword').findOne({
      where: { email: email },
    });
    if (!user) throw new AppError('No se encontro usuario con ese email', 401);
    // 2 check password with method in instance model user "validPassword"
    const password_valid = await user.validPassword(password, user.dataValues.password);
    if (!password_valid) throw new AppError('No coincide el pass', 401);
    // 3 create token to front session
    const token = await createToken({ id: user.id, email: user.email });
    // 4 check values to response
    res.status(200).json({ message: 'Ingresado Correctamente', user, token });
  } catch (error) {
    next(error);
  }
}

async function registerUser(req, res, next) {
  // TODO: validar informacion
  try {
    const { name, email, password } = req.body;
    // 1 Check if user exists with your email
    // const user = await models.User.findOne({ where: { email: email } });
    // if (user) throw new Error('Ya existe un usuario con ese email');
    // This verification is solved by the model when having unique the email
    // 2 Hash password with Hooks beforeCreate in model User
    // 3 Create user in Db
    const dataUser = {
      name,
      email,
      password,
    };
    const user = await models.User.create(dataUser);
    res.status(201).json({ message: 'Registrado Correctamente', user });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  loginUser,
  registerUser,
};
