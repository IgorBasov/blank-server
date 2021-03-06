module.exports = {
  HOST: process.env.SERVER_HOST || '127.0.0.1',
  PORT: process.env.SERVER_PORT || 3000,
  CPU_ALLOWED_QTY: process.env.SERVER_CPU_ALLOWED_QTY || false,
  SECURITY_ALLOW_RATE_LIMITING: process.env.SERVER_SECURITY_ALLOW_RATE_LIMITING || 0,
  SECURITY_RATE_LIMIT_REDIS_CONNECTION_STRING: process.env.SERVER_SECURITY_RATE_LIMIT_REDIS_CONNECTION_STRING || '',
  SECURITY_RATE_LIMIT_REDIS_HOST: process.env.SERVER_SECURITY_RATE_LIMIT_REDIS_HOST || '127.0.0.1',
  SECURITY_RATE_LIMIT_REDIS_PORT: process.env.SERVER_SECURITY_RATE_LIMIT_REDIS_PORT || 6379,
};
