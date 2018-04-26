const bunyan = require('bunyan');

module.exports = {
  logger: bunyan.createLogger({ name: appname }),
  mongodb: {
    dsn: 'mongodb://localhost:37017/ping_pocalypse',
  },
  redis: {
    options: { port: 7379 },
  },
  mysql: {
    options: {
      host: 'localhost',
      port: 3406,
      database: 'shopsy',
      dialect: 'mysql',
      username: 'root',
      password: 'mypassword',
    },
  },
};
