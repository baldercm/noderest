winston = require 'winston'

logger = new winston.Logger(
  transports: [
    new winston.transports.File(
      level: 'info'
      filename: 'noderest.log'
      handleExceptions: true
      json: true
      maxsize: 5242880 #5MB
      maxFiles: 5
      colorize: false
    )
    new winston.transports.Console(
      level: 'debug'
      colorize: true
      handleExceptions: true
    )
  ]
)

stream =
  write: (message) ->
    logger.info(message)
    return

module.exports.logger = logger
module.exports.stream = stream
