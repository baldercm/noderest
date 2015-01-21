'use strict'

var express = require('express')
var bodyParser = require('body-parser')
var compression = require('compression')
var contactRoutes = require('./contact/contactRoutes')
var logger = require('./loggerConfig').logger

var app = express()

function bootstrap() {
  var server

  app.use(compression())
  app.use(bodyParser.json())

  contactRoutes(app)

  /* jshint unused:false */
  app.use(function(err, req, res, next){
    logger.error(err.stack)
    res.status(500).send({ error: err })
  })
  /* jshint unused:true */

  server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log('noderest listening at http://%s:%s', host, port)
  })
}

module.exports.bootstrap = bootstrap
module.exports.app = app
