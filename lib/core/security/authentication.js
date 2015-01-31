'use strict'

/**
 * Module dependencies
 */
var basicAuth = require('basic-auth')

/**
 * Module exports
 */
module.exports = auth

function auth(options) {
  // jshint unused:false
  var opts = options || {}

  return function auth(req, res, next) {

    function unauthorized(res) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required')
      return res.sendStatus(401)
    }

    var user = basicAuth(req)

    if (!user || !user.name || !user.pass) {
      return unauthorized(res)
    }

    if (user.name === 'noderest' && user.pass === 'secret') {
      return next()
    } else {
      return unauthorized(res)
    }
  }
}


