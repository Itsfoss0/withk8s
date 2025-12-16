const api = require('.');
const { PORT } = require('./config/secrets.config');
const pinoLogger = require('./log/log');

api.listen(PORT, () => {
  pinoLogger.info(`Server is listening on port ${PORT}`);
});
