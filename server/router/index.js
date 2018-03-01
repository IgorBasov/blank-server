const rootRoute = require('./routes/root.route');

module.exports = {
  addTo(app) {
    app.use('/root', rootRoute);
  },
};
