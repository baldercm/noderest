winston = require 'winston'
config  = require './config'

logger = new winston.Logger(
  transports: [
    new winston.transports.File(
      level: 'debug'
      filename: 'noderest.log'
      handleExceptions: true
      json: true
      maxsize: 5242880 #5MB
      maxFiles: 5
      colorize: false
    )
    new winston.transports.Console(
      level: config.consoleLogLevel
      colorize: true
      handleExceptions: true
    )
  ]
)

debugStream =
  writes: (message) ->
    logger.debug(message)
    return

infoStream =
  write: (message) ->
    logger.info(message)
    return

warnStream =
  write: (message) ->
    logger.warn(message)
    return

errorStream =
  write: (message) ->
    logger.error(message)
    return

module.exports.logger = logger
module.exports.infoStream = infoStream
module.exports.debugStream = debugStream
module.exports.errorStream = errorStream
