var winston = require('winston')
var logger = require('../../lib/loggerConfig').logger

logger.remove(winston.transports.Console)
logger.remove(winston.transports.File)

logger.add(winston.transports.File, {
  level: 'debug',
  name: 'test-file',
  filename: 'noderest-test.log',
  json: false
})
