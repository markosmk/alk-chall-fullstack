const config = require('../config');
const { Sequelize } = require('sequelize');
const operationModel = require('../components/operation/model');

const db = {};

async function initialize() {
  const { hostname, port, user, password, database } = config;

  const sequelize = new Sequelize(database, user, password, {
    host: hostname,
    dialect: 'mysql',
  });

  try {
    sequelize.authenticate();
    console.log('Conectado a la base de datos.');
  } catch (error) {
    console.error('No se pudo conectar:', error);
  }

  db.Operation = operationModel(sequelize);

  await sequelize.sync({ force: false }).then(() => {
    console.log('tablas sincronizadas');
  });
}

initialize();

module.exports = db;
