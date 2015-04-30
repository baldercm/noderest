'use strict'

var restify = require('restify')
var morgan = require('morgan')
var passport = require('passport')
var basicStrategy = require('./security/authentication').basicStrategy
var roles = require('./security/authorization').roles
var logger = require('./logger').logger
var httpAccessStream = require('./logger').httpAccessStream


var server = restify.createServer({
  name: 'noderest'
})

server.use(restify.CORS({
  credentials: true
}));
restify.CORS.ALLOW_HEADERS.push('authorization');
restify.CORS.ALLOW_HEADERS.push('x-requested-with');
restify.CORS.ALLOW_HEADERS.push('fbtoken');

server.use(morgan('dev', {
  stream: httpAccessStream
}))

server.use(restify.queryParser());

passport.use(basicStrategy)
server.use(passport.initialize())
server.use(roles.middleware())

server.use(restify.gzipResponse());
server.use(restify.bodyParser());

var placeRouter = require('../place/place-router')
placeRouter(server)

var customerRouter = require('../customer/customer-router')
customerRouter(server)

//server.use(function(err, req, res, next){
//  logger.debug(err.stack)
//  logger.error(err)
//  res.status(500).send({ error: err })
//})

function bootstrap(_port) {
  var port = _port || 8080

  server.listen(port, function () {
    var host = server.address().address
    var port = server.address().port

    logger.info('noderest listening at http://%s:%s', host, port)
  })
}

function shutdown(done) {
  logger.debug('Restify shutdown')
  server.close(done)
}

module.exports.bootstrap = bootstrap
module.exports.shutdown = shutdown
module.exports.server = server
