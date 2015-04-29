'use strict'

var Customer = require('./customer-model').Customer
var logger = require('../core/logger').logger

var api = {
  findByUserId: findByUserId
}

function findByUserId(req, res) {
  Customer.findByUserId(req.user.id).exec()
    .then(function(customer) {
      if (customer) {
        logger.debug('Customer.findByUserId: [%s]', req.user.id)
        res.status(200).json(customer)
      } else {
        res.status(204).send()
      }
    }, function(err) {
      logger.error('Failed to find customer by userId: %s', err.message)
      res.status(400).json({ error: err })
    })
    .end()
}

module.exports = api
