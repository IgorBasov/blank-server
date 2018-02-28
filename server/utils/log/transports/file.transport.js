const winston = require('winston');

class FileTransport extends winston.transports.File {
  constructor(filePath) {
    super({
      filename: filePath,
      timestamp: Date.now,
    });
  }
}

module.exports = FileTransport;
