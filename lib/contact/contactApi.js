'use strict'

var util = require('util')
var logger = require('../loggerConfig').logger
var contactModel = require('./contactModel')

var api = {
  save: save,
  findById: findById,
  findAll: findAll
}

function save(req, res, next) {
  var contact = new contactModel.Contact(req.body)

  contact.save(function(err, contact) {
    if (err) {
      logger.error(err)
      res.status(500).json({ error: err})
    } else {
      logger.debug('Contact Created: [%s]', util.inspect(contact._id))
      res.status(201).json({ id: contact._id})
    }

    next()
  })
}

function findById(req, res, next) {
  contactModel.Contact.findById(req.params.id, function(err, contact) {
    if (err) {
      logger.error(err)
      res.status(500).json({ error: err})
    } else {
      logger.debug('Contact.findById: [%s]', util.inspect(contact._id))
      res.status(200).json(contact)
    }

    next()
  })
}

function findAll(req, res, next) {
  contactModel.Contact.find({ }, function(err, contacts) {
    if (err) {
      logger.error(err)
      res.status(500).json({ error: err})
    } else {
      logger.debug('Contact.findAll: [%s] contacts found', contacts.length)
      res.status(200).json(contacts)
    }

    next()
  })
}

module.exports = api
