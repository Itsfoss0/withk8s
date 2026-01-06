let nc = null;

const setNatsClient = (connection) => {
  nc = connection;
};

const getNatsClient = () => {
  if (!nc) {
    throw new Error('NATS client not initialized');
  }
  return nc;
};

module.exports = {
  setNatsClient,
  getNatsClient
};
