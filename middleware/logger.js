const koaPino = require('koa-pino-logger');
const pino = require('pino');

// Windows 控制台中文乱码，执行 `chcp 65001` 详情：https://ss64.com/nt/chcp.html

const PinoLevelToLevelLookup = {
  trace: 'DEBUG',
  debug: 'DEBUG',
  info: 'INFO',
  warn: 'WARNING',
  error: 'ERROR',
  fatal: 'CRITICAL',
};

let prettyPrint;
let destinationStream;

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'stage') {
  prettyPrint = true;
  destinationStream = undefined;
} else {
  prettyPrint = false;
  destinationStream = pino.destination(`${__dirname}/../log/pino-logger.log`);
}

const loggerOptions = {
  prettyPrint,
  formatters: {
    level(label) {
      return {
        level: PinoLevelToLevelLookup[label] || label,
      };
    },
  },
  timestamp: () => `,"time":"${new Date().toLocaleString()}"`,
};

const requestLogger = koaPino(loggerOptions);
const logger = pino(loggerOptions, destinationStream);

module.exports.requestLogger = requestLogger;
module.exports.logger = logger;
