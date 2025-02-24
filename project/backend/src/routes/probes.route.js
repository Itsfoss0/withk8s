const probesRouter = require('express').Router();

probesRouter.get('/status', (req, res) => {
  const timestamp = new Date().toISOString();
  return res.json({ status: 'OK', timestamp });
});

probesRouter.get('/health', (req, res) => {
  const timestamp = new Date().toISOString();
  return res.json({ health: 'OK', timestamp });
});

module.exports = probesRouter;
