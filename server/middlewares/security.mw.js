const helmet = require('helmet');

module.exports = (app) => {
  app.use(helmet());
  // uncomment it if you want to disable client caching
  // app.use(helmet.noCache());
};
