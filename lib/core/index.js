'use strict'

require('coffee-script/register')

var database  = require('./database')
var server    = require('./server')

function bootstrap(port) {
  database.bootstrap()
  server.bootstrap(port)
}

function shutdown(done) {
  server.shutdown()
  database.shutdown(done)
}

module.exports.bootstrap  = bootstrap
module.exports.shutdown   = shutdown
