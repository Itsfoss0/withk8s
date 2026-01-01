const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const probesRouter = require('./routes/probes.route');
const todoRouter = require('./routes/todo.route');
const db = require('./db');
const pinoLogger = require('./log/log');

db.connect().then(() => pinoLogger.info('Connected to PostgreSQL DB'));

const api = express();

api.use(express.json());
api.use(cors());

api.use(logger('common'));
api.use('/api/v1/', todoRouter);
api.use('/_', probesRouter);

api.use('/', (req, res) => {
  return res.json({ message: 'application is working ok' });
});

api.use((req, res) => {
  return res.status(404).json({ error: 'not found' });
});

module.exports = api;
