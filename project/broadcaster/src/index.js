const { connectToBroker } = require('./brokers/natclient.broker');
const pinoLogger = require('./logging/pino.logging');
const {
  startTodoSubscribers
} = require('./subscribers/todoservice.subscribers');

const startUpSequence = async () => {
  pinoLogger.info('startup sequence started...');
  await connectToBroker();
  await startTodoSubscribers();
};

startUpSequence();
