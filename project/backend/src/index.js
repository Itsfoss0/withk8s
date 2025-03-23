const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const probesRouter = require('./routes/probes.route');
const todoRouter = require('./routes/todo.route');
const db = require('./db');

db.connect().then(() => console.log('Connected to PostgreSQL DB'));

const api = express();

api.use(express.json());
api.use(cors());

api.use(logger('common'));
api.use('/api/v1/', todoRouter);
api.use('/_', probesRouter);

api.use((req, res) => {
  return res.status(404).json({ error: 'not found' });
});

module.exports = api;
