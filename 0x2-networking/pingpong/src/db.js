const { Client } = require('pg');
const { PG_USER, DB_NAME, PG_PASSWORD, PG_HOST } = require('./config');

const db = new Client({
  user: PG_USER,
  database: DB_NAME,
  password: PG_PASSWORD,
  host: PG_HOST
});

module.exports = db;
