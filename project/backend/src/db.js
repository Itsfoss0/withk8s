const { Client } = require('pg');
const {
  DB_NAME,
  PG_HOST,
  PG_PASSWORD,
  PG_USER
} = require('./config/secrets.config');

const config = {
  host: PG_HOST,
  password: PG_PASSWORD,
  user: PG_USER,
  database: DB_NAME
};

const db = new Client(config);

module.exports = db;
