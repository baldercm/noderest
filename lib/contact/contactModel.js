'use strict'

var mongoose = require('mongoose')
var schemaToJsonTransform = require('../core/mongoose/schemaToJsonTransform')

var contactSchema = new mongoose.Schema({
  name: String,
  age: Number,
  isPremium: Boolean
})

schemaToJsonTransform(contactSchema)

var Contact = mongoose.model('Contact', contactSchema)

module.exports.Contact = Contact
module.exports.contactSchema = contactSchema
