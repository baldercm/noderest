'use strict'

var Q = require('q')
var logger = require('../core/logger').logger
var Customer = require('./customer-model').Customer

var api = {
  findByUserId: findByUserId
}

function findByUserId(req, res, next) {
  Q.ninvoke(Customer, 'findOne', {userId: req.user._id.toString()})
    .then(function(customer) {
      res.status(200).json(customer)
    })
    .catch(function(err) {
      logger.error('Failed to find customer by userId: %s', err.message)
      res.status(400).json({ error: err })
    })
    .done(next)
}

module.exports = api
