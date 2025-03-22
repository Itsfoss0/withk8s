const initializeDB = async (client) => {
  await client.query('INSERT INTO pings (count) VALUES (1)');
};

module.exports = initializeDB;
