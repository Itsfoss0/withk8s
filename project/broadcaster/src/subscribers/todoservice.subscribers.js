const { getNatsClient } = require('../client/natclient.client');
const { StringCodec } = require('nats');
const {
  TODO_CREATED,
  TODO_UPDATED
} = require('../subjects/todoservice.subjects');
const { sendTelegramMessage } = require('../services/telegramMessages.service');
const pinoLogger = require('../logging/pino.logging');

const sc = StringCodec();

const subscribeTodoCreated = async () => {
  const nc = getNatsClient();
  const sub = nc.subscribe(TODO_CREATED);

  (async () => {
    for await (const msg of sub) {
      const data = sc.decode(msg.data);
      pinoLogger.info(`[todo.created #${sub.getProcessed()}]`);
      sendTelegramMessage(`New task item has been added\n  \n${data}\n`);
    }
  })();
};

const subscribeTodoUpdated = async () => {
  const nc = getNatsClient();
  const sub = nc.subscribe(TODO_UPDATED);

  (async () => {
    for await (const msg of sub) {
      const data = sc.decode(msg.data);
      pinoLogger.info(`[todo.updated #${sub.getProcessed()}]`);
      sendTelegramMessage(`Task item has been marked as done\n \n${data}\n`);
    }
  })();
};

const startTodoSubscribers = async () => {
  await subscribeTodoCreated();
  await subscribeTodoUpdated();
};

module.exports = {
  startTodoSubscribers
};
