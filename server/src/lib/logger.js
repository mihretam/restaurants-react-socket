import winston, { format } from 'winston';
import appRoot from 'app-root-path';

const { combine, timestamp, printf } = format;
const maximumLogFIleSize = 5242880

const path = require('path');

const myFormat = printf((info) => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});
const logger = winston.createLogger({
  level: 'info',
  format: combine(
    format.label({ label: path.basename(module.parent.filename) }),
    timestamp(),
    format.colorize(),
    myFormat
  ),
  transports: [
    new winston.transports.Console({ level: 'debug', name: 'debug-console' }),
    new winston.transports.File({
      name: 'error-file',
      filename: `${appRoot}/logs/error.log`,
      level: 'error',
      json: false,
      maxsize: maximumLogFIleSize,
      maxFiles: 5,
    }),
    new winston.transports.File({
      name: 'combined-file',
      filename: `${appRoot}/logs/combined.log`,
      level: 'info',
      json: false,
      timestamp: () => new Date().toISOString(),
      maxsize: maximumLogFIleSize,
      maxFiles: 5,
    }),
  ],
  exitOnError: false,
});
logger.stream = {
  write: (message, encoding) => { /* eslint-disable-line no-unused-vars */
    logger.info(message);
  },
};

export default logger;
