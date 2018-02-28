const path = require('path');

module.exports = {
  mongoDB: {
    connectionString: process.env.MONGO_LOG_CONNECTION_STRING || 'mongodb://localhost:27017/log',
    collectionName: process.env.MONGO_LOG_COLLECTION_NAME || 'logs',
  },
  file: {
    path: process.env.FILE_LOG_PATH || path.join(__dirname, '../../server.log'),
  },
};
