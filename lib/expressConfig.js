var express = require('express')
var bodyParser = require('body-parser')
var contactRoutes = require('./contact/contactRoutes')

var app = express()

function bootstrap() {
  var server

  app.use(bodyParser.json())

  /* jshint unused:false */
  app.use(function(err, req, res, next){
    console.error(err.stack)
    res.sendStatus(500)
  })
  /* jshint unused:true */

  contactRoutes(app)

  server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log('noderest listening at http://%s:%s', host, port)
  })
}

module.exports.bootstrap = bootstrap
module.exports.app = app
