'use strict'

var _ = require('underscore')
var restify = require('restify')
var logger = require('../../core/logger').logger
var Place = require('../place-model').Place

var api = {
  findById: findById,
  find: find,
  findAll: findAll,
  findAround: findAround,
  findByMajorId: findByMajorId
}

function findById(req, res) {
  Place.findById(req.params.id).exec()
    .then(function(place) {
      if (place) {
        logger.debug('Place.findById: [%s]', place.id)
        res.send(200, place)
      } else {
        logger.debug('Place.findById: [%s]. No place found', req.params.id)
        res.send(204)
      }
    }, function(err) {
      logger.error('Failed to find place by id: %s', err.message)
      res.send(new restify.InternalServerError(err.message))
    })
    .end()
}

function find(req, res) {
  if (req.query.latitude && req.query.longitude) {
    api.findAround(req, res)
  } else if (req.query.beaconMajorId) {
    api.findByMajorId(req, res)
  } else {
    api.findAll(req, res)
  }
}

function findAll(req, res) {
  Place.find({}).exec()
    .then(function(places) {
      logger.debug('Place.findAll: [%s] places found', places.length)
      res.send(200, places)
    }, function(err) {
      logger.error('Failed to find all places: %s', err.message)
      res.send(new restify.InternalServerError(err.message))
    })
    .end();
}

function findByMajorId(req, res) {
  Place.find({ 'beaconDevice.majorId': req.query.beaconMajorId }).exec()
    .then(function(places) {
      logger.debug('Place.findByMajorId: [%s] places found', places.length)
      res.send(200, places)
    }, function(err) {
      logger.error('Failed to find places by beacon majorId: %s', err.message)
      res.send(new restify.InternalServerError(err.message))
    })
    .end()
}

function findAround(req, res) {
  var
    lat = Number(req.query.latitude),
    lon = Number(req.query.longitude)

  Place.geoNear([lat, lon], { maxDistance : 0.009})
    .then(function(places) {
      logger.debug('Place.findAround: [%s] places found', places.length)
      res.send(200, _.pluck(places, 'obj'))
    }, function(err) {
      logger.error('Failed to find places around: %s', err.message)
      res.send(new restify.InternalServerError(err.message))
    })
    .end()
}

module.exports = api
