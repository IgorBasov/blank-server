const winston = require('winston');

function beautify(num) {
  if (num < 10) {
    return `0${num}`;
  }
  return num.toString();
}

function beautifyMillis(num) {
  if (num < 10) {
    return `00${num}`;
  }
  if (num < 100) {
    return `0${num}`;
  }
  return num.toString();
}

class ConsoleTransport extends winston.transports.Console {
  constructor() {
    super({
      timestamp() {
        const d = new Date();
        return `${d.getFullYear()}.${beautify(d.getMonth() + 1)}.${beautify(d.getDate())} ${beautify(d.getHours())}:${beautify(d.getMinutes())}:${beautify(d.getSeconds())}.${beautifyMillis(d.getMilliseconds())}`;
      },
      colorize: true,
    });
  }
}

module.exports = ConsoleTransport;
