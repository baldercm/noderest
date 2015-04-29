'use strict'

var express = require('express')
var passport = require('passport')
var user = require('../core/security/authorization').roles
var customerApi = require('./customer-api')

var router = express.Router()

router.get('/me',
  passport.authenticate('basic', { session: false }),
  user.is('ROLE_USER'),
  customerApi.findByUserId)

module.exports = router
