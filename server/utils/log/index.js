/**
 * Модуль логирования. Является оболочкой модуля <i>winston</i>
 * @module utils/log/index.js
 * @see {@link https://github.com/winstonjs/winston|winston}
 */

const winston = require('winston');

const logConfig = require('../../config').log;
const serverConfig = require('../../config').server;
const packageJson = require('../../../package.json');

const ConsoleTransport = require('./transports/console.transport');
const FileTransport = require('./transports/file.transport');
const MongoDBTransport = require('./transports/mongodb.transport');

const logger = new (winston.Logger)({
  transports: [
    new ConsoleTransport(),
    new FileTransport(logConfig.file.path),
    new MongoDBTransport(logConfig.mongoDB, serverConfig, packageJson),
  ],
});

class ConfiguredLogger {
  constructor(metaInfo) {
    const self = this;
    self.meta = metaInfo || {};

    ['info', 'warn', 'error', 'log'].forEach((method) => {
      self[method] = (...args) => {
        let meta = args[1] || {};
        if (meta instanceof Error) {
          meta = {
            error: {
              message: meta.message,
              stack: meta.stack,
              name: meta.name,
            },
          };
        }
        if (meta.error instanceof Error) {
          meta.error = {
            message: meta.error.message,
            stack: meta.error.stack,
            name: meta.error.name,
          };
        }
        logger[method](args[0], Object.assign(meta, self.meta));
      };
    });
  }
}
logger.ConfiguredLogger = ConfiguredLogger;

global.log = logger;
module.exports = logger;
