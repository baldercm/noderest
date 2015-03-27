'use strict'

var Q = require('q')
var _ = require('underscore')
var logger = require('../core/logger').logger
var Place = require('./place-model').Place

var api = {
  findById: findById,
  find: find,
  findAll: findAll,
  findAround: findAround,
  findByMajorId: findByMajorId
}

function findById(req, res) {
  Place.findById(req.params.id, function(err, place) {
    if (err) {
      logger.error('Failed to find place by id: %s', err.message)
      res.status(400).json({ error: err })
      return
    }

    logger.debug('Place.findById: [%s]', place.id)
    res.status(200).json(place)
  })
}

function find(req, res, next) {
  if (req.query.latitude && req.query.longitude) {
    api.findAround(req, res, next)
  } else if (req.query.beaconMajorId) {
    api.findByMajorId(req, res, next)
  } else {
    api.findAll(req, res, next)
  }
}

function findAll(req, res, next) {
  Q.ninvoke(Place, 'find', { })
    .then(function(places) {
      logger.debug('Place.findAll: [%s] places found', places.length)
      res.status(200).json(places)
    })
    .catch(function(err) {
      logger.error('Failed to find all places: %s', err.message)
      res.status(400).json({ error: err })
    })
    .done(next)
}

function findByMajorId(req, res, next) {
  Q.ninvoke(Place, 'find', { 'beaconDevice.majorId': req.query.beaconMajorId })
    .then(function(places) {
      logger.debug('Place.findByMajorId: [%s] places found', places.length)
      res.status(200).json(places)
    })
    .catch(function(err) {
      logger.error('Failed to find places by beacon majorId: %s', err.message)
      res.status(400).json({ error: err })
    })
    .done(next)
}

function findAround(req, res, next) {
  var
    lat = Number(req.query.latitude),
    lon = Number(req.query.longitude)

  Q.ninvoke(Place, 'geoNear', [lat, lon], { maxDistance : 0.009})
    .then(function(result) {
      var places = result[0]
      logger.debug('Place.findAround: [%s] places found', places.length)
      res.status(200).json(_.pluck(places, 'obj'))
    })
    .catch(function(err) {
      logger.error('Failed to find places around: %s', err.message)
      res.status(400).json({ error: err })
    })
    .done(next)
}

module.exports = api
