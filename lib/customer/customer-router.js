'use strict'

var passport = require('passport')
var user = require('../core/security/authorization').roles
var customerApi = require('./customer-api')

function customerRouter(server) {
  server.get('/customers/me',
    passport.authenticate('basic', { session: false }),
    user.is('ROLE_USER'),
    customerApi.findByUserId)
}

module.exports = customerRouter
