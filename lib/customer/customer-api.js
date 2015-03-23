'use strict'

var Q = require('q')
var Customer = require('./customer-model').Customer
var logger = require('../core/logger').logger

var api = {
  findByUserId: findByUserId
}

function findByUserId(req, res, next) {
  Q.ninvoke(Customer, 'findByUserId', req.user.id)
    .then(function(customer) {
      if (customer) {
        logger.debug('Customer.findByUserId: [%s]', req.user.id)
        res.status(200).json(customer)
      } else {
        res.status(204).send()
      }
    })
    .catch(function(err) {
      logger.error('Failed to find customer by userId: %s', err.message)
      res.status(400).json({ error: err })
    })
    .done(next)
}

module.exports = api
