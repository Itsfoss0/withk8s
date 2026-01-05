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
const NATS_SERVER_URL = process.env.NATS_SERVER_URL;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

module.exports = {
  PORT,
  DB_NAME,
  PG_HOST,
  PG_PASSWORD,
  PG_USER,
  NATS_SERVER_URL,
  TELEGRAM_CHAT_ID,
  TELEGRAM_BOT_TOKEN
};
