const { StringCodec } = require('nats');
const { getNatsClient } = require('../broker/natclient.broker');
const { TODO_CREATED, TODO_UPDATED } = require('../broker/subjects.broker');
const { sendTelegramMessage } = require('../utils/telegram.utils');

const sc = StringCodec();

const subscribeTodoCreated = async () => {
  const nc = getNatsClient();
  const sub = nc.subscribe(TODO_CREATED);

  (async () => {
    for await (const msg of sub) {
      const data = sc.decode(msg.data);
      console.log(`[todo.created #${sub.getProcessed()}]`, data);
      sendTelegramMessage(
        `New task item has been added\n  \n${data}\n`
      );
    }
  })();
};

const subscribeTodoUpdated = async () => {
  const nc = getNatsClient();
  const sub = nc.subscribe(TODO_UPDATED);

  (async () => {
    for await (const msg of sub) {
      const data = sc.decode(msg.data);
      console.log(`[todo.updated #${sub.getProcessed()}]`, data);
      sendTelegramMessage(
        `Task item has been marked as done\n \n${data}\n`
      );
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
