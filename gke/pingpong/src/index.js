const PORT = process.env.PORT || 3000;
const express = require('express');
const logger = require('morgan');
const db = require('./db');
const initializeDB = require('./utils');

const app = express();
db.connect().then(() => console.log('Connected to Postgres DB'));
initializeDB(db).then(() => console.log('Initial records injected to DB'));

const updateQry = 'UPDATE pings SET count = $1 WHERE id = $2';
const retrieveQry = 'SELECT * FROM pings';

app.use(logger('dev'));
app.get('/pingpong', async (req, res) => {
  try {
    const now = new Date().toISOString();
    const data = await (await db.query(retrieveQry)).rows[0];
    const newCount = data.count + 1;
    await db.query(updateQry, [newCount, data.id]);
    return res.json({ message: `pong ${data.count}`, time: now });
  } catch (err) {
    console.error(err);
    return res
      .status(503)
      .json({ status: 'error', message: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  return res.json({ message: 'application is running ok' });
});

app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    return res.status(200).json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Health check failed:', err);
    return res.status(503).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: err.message,
      timestamp: new Date().toISOString()
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
