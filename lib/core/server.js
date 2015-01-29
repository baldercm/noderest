'use strict'

var express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var compression = require('compression')
var logger = require('./logger').logger
var authentication = require('./security/authentication')
var loggerDebugStream = require('./logger').loggerDebugStream
var placeRouter = require('../place/place-router')

var server
var app = express()

app.use(morgan('dev', {
  stream: loggerDebugStream
}))

app.use(authentication())
app.use(compression())
app.use(bodyParser.json())

app.use('/places', placeRouter)

/* jshint unused:false */
app.use(function(err, req, res, next){
  logger.error(err.stack)
  res.status(500).send({ error: err })
})
/* jshint unused:true */

function bootstrap(_port) {
  var port = _port || 8080

  server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port

    console.log('noderest listening at http://%s:%s', host, port)
  })
}

function shutdown(done) {
  logger.debug('Express shutdown')
  server.close(done)
}

module.exports.bootstrap = bootstrap
module.exports.shutdown = shutdown
module.exports.app = app
