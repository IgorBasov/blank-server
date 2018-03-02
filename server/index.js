// Require module log. log is global now
require('./utils/log');

const cluster = require('cluster');
const app = require('./app');
const serverConfig = require('./config').server;
const CPUsAvailable = require('os').cpus().length;

const instancesQty = CPUsAvailable < serverConfig.CPU_ALLOWED_QTY || !serverConfig.CPU_ALLOWED_QTY
  ? CPUsAvailable
  : serverConfig.CPU_ALLOWED_QTY;

if (cluster.isMaster) {
  log.info('master is running', { pid: process.pid });

  // fork workers
  for (let i = 0; i < instancesQty; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    log.info('worker died', { pid: worker.process.pid, code, signal });
  });
} else {
  app.start();
}
