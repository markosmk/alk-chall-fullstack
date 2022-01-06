require('dotenv').config();

const config = {
  NODE_ENV: process.env.NODE_ENV !== 'production',
  PORT: process.env.PORT || 8000,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  hostname: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
};

module.exports = config;
