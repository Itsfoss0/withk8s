const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const probesRouter = require('./routes/probes.route');
const todoRouter = require('./routes/todo.route');

const api = express();

api.use(express.json());
api.use(cors());

api.use(logger('common'));
api.use('/api/v1/', todoRouter);
api.use('/_', probesRouter);

api.use('/', (_req, res) => {
  return res.json({ message: 'application is working ok' });
});

api.use((_req, res) => {
  return res.status(404).json({ error: 'not found' });
});

module.exports = api;
