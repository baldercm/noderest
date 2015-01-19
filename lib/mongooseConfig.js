'use strict'

var mongoose, dbUri

mongoose = require('mongoose')

dbUri = require('./config').dbUri

function bootstrap() {
  mongoose.connect(dbUri)

  mongoose.connection.once('open', function() {
    console.log('Mongoose connected to ' + dbUri)
  })

  mongoose.connection.on('error', function(err) {
    console.error('Mongoose connection error: ' + err)
  })

  process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      console.log('Mongoose connection disconnected through app termination')
      process.exit(0)
    })
  })

  require('./contact/contactModel')
}

module.exports.bootstrap = bootstrap
