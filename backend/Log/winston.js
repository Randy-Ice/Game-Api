const winston = require('winston')

const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'log_information.log'})
    ]
  });


  module.exports = logger