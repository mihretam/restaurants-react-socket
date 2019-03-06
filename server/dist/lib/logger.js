"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _winston = _interopRequireWildcard(require("winston"));

var _appRootPath = _interopRequireDefault(require("app-root-path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var combine = _winston.format.combine,
    timestamp = _winston.format.timestamp,
    printf = _winston.format.printf;

var path = require('path');

var myFormat = printf(function (info) {
  return "".concat(info.timestamp, " [").concat(info.label, "] ").concat(info.level, ": ").concat(info.message);
});

var logger = _winston.default.createLogger({
  level: 'info',
  format: combine(_winston.format.label({
    label: path.basename(module.parent.filename)
  }), timestamp(), _winston.format.colorize(), myFormat),
  transports: [new _winston.default.transports.Console({
    level: 'debug',
    name: 'debug-console'
  }), new _winston.default.transports.File({
    name: 'error-file',
    filename: "".concat(_appRootPath.default, "/logs/error.log"),
    level: 'error',
    json: false,
    maxsize: 5242880,
    maxFiles: 5
  }), new _winston.default.transports.File({
    name: 'combined-file',
    filename: "".concat(_appRootPath.default, "/logs/combined.log"),
    level: 'info',
    json: false,
    timestamp: function timestamp() {
      return new Date().toISOString();
    },
    maxsize: 5242880,
    maxFiles: 5
  })],
  exitOnError: false
});

logger.stream = {
  write: function write(message, encoding) {
    /* eslint-disable-line no-unused-vars */
    logger.info(message);
  }
};
var _default = logger;
exports.default = _default;