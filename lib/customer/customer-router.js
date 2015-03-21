'use strict'

var express = require('express')
var passport = require('passport')
var customerApi = require('./customer-api')

var router = express.Router()

router.get('/me',
  passport.authenticate('basic', { session: false }),
  customerApi.findByUserId)

module.exports = router
