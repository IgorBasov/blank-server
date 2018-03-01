const express = require('express');
const http = require('http');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const router = require('./router');
const serverConfig = require('./config').server;

module.exports = {
  start() {
    const app = express();

    // view engine setup
    app.set('views', path.join(__dirname, '../frontend/views'));
    app.set('view engine', 'ejs');

    app.use(favicon(path.join(__dirname, '../frontend', 'favicon.ico')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../frontend')));

    router.addTo(app);

    // catch 404 and forward to error handler
    /* eslint no-unused-vars: ["error", { "args": "none" }] */
    app.use((req, res, next) => {
      log.error('not found', { url: req.originalUrl, method: req.method });
      res
        .status(404)
        .render('404.error');
    });

    // error handler
    /* eslint no-unused-vars: ["error", { "args": "none" }] */
    app.use((error, req, res, next) => {
      log.error('server error', { url: req.originalUrl, method: req.method, error });
      res
        .status(500)
        .render('500.error');
    });

    const server = http.createServer(app);
    server.listen(serverConfig.PORT, serverConfig.HOST);
    server.on('error', (error) => {
      switch (error) {
        case 'EACCES': {
          log.error(`port ${serverConfig.PORT} requires elevated privileges`);
          process.exit(1);
          break;
        }
        case 'EADDRINUSE': {
          log.error(`port ${serverConfig.PORT} is already in use`);
          process.exit(1);
          break;
        }
        default: {
          throw error;
        }
      }
    });
    server.on('listening', () => {
      log.info('listening', { host: serverConfig.HOST, port: serverConfig.PORT });
    });
  },
};

