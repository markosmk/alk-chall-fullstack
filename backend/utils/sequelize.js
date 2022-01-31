const { hostname, user, password, database } = require('../config');
const { Sequelize } = require('sequelize');
const { applyExtraOptions } = require('./applyExtraOptions');
// const { mockBulk } = require('./mockBulk');

// create conection to DB
const sequelize = new Sequelize(database, user, password, {
  host: hostname,
  dialect: 'mysql',
});

// all Models
const modelDefiners = [
  require('../components/user/user.model'),
  require('../components/operation/operation.model'),
  require('../components/category/category.model'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}
// Apply additional options ex: associations
applyExtraOptions(sequelize);

async function initialize() {
  try {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos.');
  } catch (error) {
    console.error('No se pudo conectar:', error.message);
    return;
  }
  await sequelize.sync({ force: false });
  // create mock if sync -> force is true
  // mockBulk(sequelize);
}

initialize();

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
