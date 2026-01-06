const axios = require('axios');
const {
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID
} = require('../config/secrets.config');
const pinoLogger = require('../logging/pino.logging');

const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

const sendTelegramMessage = async (text) => {
  try {
    await axios.post(TELEGRAM_API, {
      chat_id: TELEGRAM_CHAT_ID,
      text
    });
    pinoLogger.info('message sent to telegram');
  } catch (err) {
    console.error('Failed to send Telegram message:', err.message);
  }
};

module.exports = { sendTelegramMessage };
