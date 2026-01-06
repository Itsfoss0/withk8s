const pinoLogger = require('pino')({
  formatters: {
    level: (label, numericLevel) => {
      return { level: label };
    }
  }
});

module.exports = pinoLogger;
