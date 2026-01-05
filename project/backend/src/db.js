const { Pool } = require('pg');
const {
  DB_NAME,
  PG_HOST,
  PG_PASSWORD,
  PG_USER
} = require('./config/secrets.config');
const pinoLogger = require('./log/log');

const config = {
  host: PG_HOST,
  password: PG_PASSWORD,
  user: PG_USER,
  database: DB_NAME
};

const db = new Pool(config);

db.on('connect', () => {
  pinoLogger.info(`Connected to postgress db ${DB_NAME} on ${PG_HOST} `);
});

db.on('end', () => {
  pinoLogger.info('Client closed connection to the pg');
});

module.exports = db;
