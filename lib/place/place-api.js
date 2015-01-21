'use strict'

var util = require('util')
var logger = require('../core/logger').logger
var Place = require('./place-model').Place

var api = {
  findById: findById,
  find: find,
  findAll: findAll,
  findAround: findAround
}

function findById(req, res, next) {
  Place.findById(req.params.id, function(err, place) {
    if (err) {
      logger.error(err)
      res.status(500).json({ error: err})
    } else {
      logger.debug('Place.findById: [%s]', util.inspect(place._id))
      res.status(200).json(place)
    }

    next()
  })
}

function find(req, res, next) {
  if (req.query.latitude && req.query.longitude) {
    api.findAround(req, res, next)
  } else {
    api.findAll(req, res, next)
  }
}

function findAll(req, res, next) {
  Place.find({ }, function(err, places) {
    if (err) {
      logger.error(err)
      res.status(500).json({ error: err})
    } else {
      logger.debug('Place.findAll: [%s] places found', places.length)
      res.status(200).json(places)
    }

    next()
  })
}

function findAround(req, res, next) {
  Place.geoNear([40.4165508, -3.703799], { maxDistance : 0.009}, function(err, places) {
    if (err) {
      logger.error(err)
      res.status(500).json({ error: err})
    } else {
      logger.debug('Place.findAround: [%s] places found', places.length)
      res.status(200).json(places)
    }

    next()
  })
}

module.exports = api
