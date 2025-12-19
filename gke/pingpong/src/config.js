require('dotenv').config();

const PG_HOST = process.env.PG_HOST;
const PG_PASSWORD = process.env.PG_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const PG_USER = process.env.PG_USER;

module.exports = {
  PG_HOST,
  PG_PASSWORD,
  DB_NAME,
  PG_USER
};
