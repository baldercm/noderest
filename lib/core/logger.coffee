winston = require 'winston'
config  = require './config'

mainLogger = winston.loggers.add('main-logger',
  file:
    level: 'info'
    filename: 'noderest.log'
    json: false
    maxsize: 5242880 #5MB
    maxFiles: 5
    handleExceptions: true
  console:
    level: config.consoleLogLevel
    handleExceptions: true
)

httpAccessLogger = winston.loggers.add('http-access-logger',
  console:
    level: config.consoleLogLevel
)

httpAccessStream =
  write: (message) ->
    httpAccessLogger.info(message)
    return

module.exports.logger = mainLogger
module.exports.httpAccessStream = httpAccessStream
