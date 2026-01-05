const { StringCodec } = require('nats');
const { getNatsClient } = require('../natclient.broker');
const pinoLogger = require('../../log/log');

const sc = StringCodec();

const publishTodoEvents = (payload, subject) => {
  try {
    const nc = getNatsClient();

    const data = sc.encode(JSON.stringify(payload));
    nc.publish(subject, data);
    pinoLogger.info(`published event to ${subject}`);
  } catch (err) {
    pinoLogger.error(
      `failed to publish paylod to subject '${subject}', ${err}`
    );
  }
};

module.exports = {
  publishTodoEvents
};
