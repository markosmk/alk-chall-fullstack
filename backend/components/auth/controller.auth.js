const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwt_secret } = require('../../config');
const db = require('../../utils/mysql');

async function loginUser(req, res, next) {
  const { email, password } = req.body;

  try {
    // 1 check si email exists
    const user = await db.User.findOne({ where: { email: email } });
    if (!user) throw new Error('No se encontro usuario con ese email');
    // 2 check password
    console.log(password, user.dataValues.password);
    const password_valid = await user.validPassword(password, user.dataValues.password);
    // const password_valid = await bcrypt.compare(password, user.password);
    if (!password_valid) throw new Error('No coincide el pass');

    const token = jwt.sign({ id: user.id, email: user.email }, jwt_secret);
    res.status(200).json({ status: 'Ingresado Correctamente', user, token });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function registerUser(req, res, next) {
  // TODO: validar informacion
  try {
    const { name, email, password } = req.body;
    // 1 Comprobar si existe un usuario
    // const user = await db.User.findOne({ where: { email: email } });
    // if (user) throw new Error('Ya existe un usuario con ese email');

    // 2 Hash contrase
    // const salt = await bcrypt.genSalt(10);
    const dataUser = {
      name,
      email,
      password,
      // password: await bcrypt.hash(password, salt),
    };
    const newUser = await db.User.create(dataUser);

    res.status(201).json({ message: 'Registrado Correctamente', user: newUser });
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
  loginUser,
  registerUser,
};
