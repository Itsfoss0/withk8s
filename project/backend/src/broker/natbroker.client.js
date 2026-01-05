const { connect } = require('nats');
const { NATS_SERVER_URL } = require('../config/secrets.config');
const pinoLogger = require('../log/log');
const { setNatsClient } = require('./natclient.broker');

const connectToBroker = async () => {
  try {
    const connection = await connect({
      servers: NATS_SERVER_URL,
      user: 'admin',
      pass: 'admin'
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
