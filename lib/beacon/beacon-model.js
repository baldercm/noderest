'use strict'

var mongoose = require('mongoose')

var beaconSchema = new mongoose.Schema({
  majorId: String,
  minorIds: [String]
})

module.exports.beaconSchema = beaconSchema
