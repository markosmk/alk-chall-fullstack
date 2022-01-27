const config = require('../config');
const { Sequelize } = require('sequelize');

// all Models
const userModel = require('../components/user/model.user');
const operationModel = require('../components/operation/model.operation');

const db = {};

async function initialize() {
  const { hostname, user, password, database } = config;

  const sequelize = new Sequelize(database, user, password, {
    host: hostname,
    dialect: 'mysql',
  });

  try {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos.');
  } catch (error) {
    console.error('No se pudo conectar:', error.message);
    return;
  }
  // asign Models
  db.User = userModel(sequelize);
  db.Operation = operationModel(sequelize);

  await sequelize.sync({ force: false }).then(() => {
    console.log('tablas sincronizadas');
  });
}

initialize();

module.exports = db;
