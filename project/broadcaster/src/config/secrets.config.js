/*
 * manage config and sensitive info here
 *
 */

require('dotenv').config();

const NATS_SERVER_URL = process.env.NATS_SERVER_URL;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

module.exports = {
  NATS_SERVER_URL,
  TELEGRAM_CHAT_ID,
  TELEGRAM_BOT_TOKEN
};
