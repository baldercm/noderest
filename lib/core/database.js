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

  process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      logger.debug('Mongoose connection disconnected through app termination')
      process.exit(0)
    })
  })

}

module.exports.bootstrap = bootstrap
