'use strict'

var express = require('express')
var cors = require('cors')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var compression = require('compression')
var passport = require('passport')
var basicStrategy = require('./security/authentication').basicStrategy
var roles = require('./security/authorization').roles
var logger = require('./logger').logger
var httpAccessStream = require('./logger').httpAccessStream
var placeRouter = require('../place/place-router')
var customerRouter = require('../customer/customer-router')

var server
var app = express()

app.use(morgan('dev', {
  stream: httpAccessStream
}))

app.use(cors({
  origin: true,
  methods: 'GET, POST, PUT, DELETE, HEAD, OPTIONS',
  allowedHeaders: 'Authorization, X-Requested-With, Origin, Fbtoken, Content-Type, Accept',
  credentials: true
}))

passport.use(basicStrategy)
app.use(passport.initialize())

app.use(roles.middleware())

app.use(compression())
app.use(bodyParser.json())

app.use('/places', placeRouter)
app.use('/customers', customerRouter)

/* jshint unused:false */
app.use(function(err, req, res, next){
  logger.debug(err.stack)
  logger.error(err.message)
  res.status(500).send({ error: err })
})
/* jshint unused:true */

function bootstrap(_port) {
  var port = _port || 8080

  server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port

    logger.info('noderest listening at http://%s:%s', host, port)
  })
}

function shutdown(done) {
  logger.debug('Express shutdown')
  server.close(done)
}

module.exports.bootstrap = bootstrap
module.exports.shutdown = shutdown
module.exports.app = app
