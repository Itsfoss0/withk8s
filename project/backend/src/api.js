const api = require('.');
const { PORT } = require('./config/secrets.config');
const db = require('./db');
const { connectToBroker } = require('./broker/natbroker.client');
const pinoLogger = require('./log/log');
const { startTodoSubscribers } = require('./services/broadcaster.service');

const start = async () => {
  try {
    await connectToBroker();
    await db.connect();

    await startTodoSubscribers();

    api.listen(PORT, () => {
      pinoLogger.info(`Server is listening on port ${PORT}`);
    });
  } catch (err) {
    pinoLogger.fatal(err, `API could not be started, ${err.message}`);
    process.exit(1);
  }
};

start();
