'use strict'

var mongoose = require('mongoose')
var schemaToJsonTransform = require('../core/mongoose/schemaToJsonTransform')

var placeSchema = new mongoose.Schema({
  name: String,
  shortDescription: String,
  location: [Number]
}, {
  collection: 'place'
})

schemaToJsonTransform(placeSchema)

var Place = mongoose.model('Place', placeSchema)

module.exports.Place = Place
module.exports.placeSchema = placeSchema
