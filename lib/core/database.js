'use strict'

var mongoose = require('mongoose')
var config = require('./config')
var logger = require('./logger').logger

function bootstrap() {
  mongoose.connect(config.dbUri)

  mongoose.connection.once('open', function() {
    logger.debug('Mongoose connected to ' + config.dbUri)
  })

  mongoose.connection.on('error', function(err) {
    logger.error('Mongoose connection error: ' + err)
  })

}
function shutdown(done) {
  logger.debug('Mongoose shutdown')
  mongoose.connection.close(done)
}

module.exports.bootstrap = bootstrap
module.exports.shutdown = shutdown
