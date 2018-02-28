const winston = require('winston');
require('winston-mongodb');

class MongoDBTransport extends winston.transports.MongoDB {
  constructor(mongoDBConfig, serverConfig, instanceInfo) {
    super({
      timestamp() {
        return new Date();
      },
      db: mongoDBConfig.connectionString,
      collection: mongoDBConfig.collectionName,
      storeHost: true, // 'hostname' field, which stores os.hostname() value
      label: `${serverConfig.HOST}:${serverConfig.PORT}/${instanceInfo.name}/${instanceInfo.version}`,
      tryReconnect: true,
    });
  }
}

module.exports = MongoDBTransport;
