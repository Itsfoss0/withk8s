/*
 * provides a centralized file
 * to manage configuration data
 * for the applicaion
 *
 */

require('dotenv').config();

const PORT = process.env.PORT;
const PG_USER = process.env.PG_USER;
const PG_PASSWORD = process.env.PG_PASSWORD;
const PG_HOST = process.env.PG_HOST;
const DB_NAME = process.env.DB_NAME;

module.exports = {
  PORT,
  DB_NAME,
  PG_HOST,
  PG_PASSWORD,
  PG_USER
};
