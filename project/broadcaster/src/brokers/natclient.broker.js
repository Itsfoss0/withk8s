const { connect } = require('nats');
const { setNatsClient } = require('../client/natclient.client');
const { NATS_SERVER_URL } = require('../config/secrets.config');
const pinoLogger = require('../logging/pino.logging');

const connectToBroker = async () => {
  try {
    const connection = await connect({
      servers: NATS_SERVER_URL
    });
    pinoLogger.info(`Connected to nats broker on ${connection.getServer()}`);
    setNatsClient(connection);
    return connection;
  } catch (err) {
    pinoLogger.fatal(`Could not connect to prodbroker on ${NATS_SERVER_URL}`);
    throw err;
  }
};

module.exports = {
  connectToBroker
};
