module.exports = {
  HOST: process.env.SERVER_HOST || '127.0.0.1',
  PORT: process.env.SERVER_PORT || 3000,
  CPU_ALLOWED_QTY: process.env.SERVER_CPU_ALLOWED_QTY || false,
};
