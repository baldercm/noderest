'use strict'

var restify = require('restify')
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
        res.send(200, customer)
      } else {
        res.send(204)
      }
    }, function(err) {
      logger.error('Failed to find customer by userId: %s', err.message)
      res.send(new restify.InternalServerError(err.message))
    })
    .end()
}

module.exports = api
