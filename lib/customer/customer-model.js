'use strict'

var mongoose = require('mongoose')

var customerSchema = new mongoose.Schema({
  email: String,
  alias: String,
  birthDate: Date
})

customerSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id

    delete ret._id
    delete ret._class
  }
})

var Customer = mongoose.model('Customer', customerSchema, 'customer')

module.exports.Customer = Customer
module.exports.customerSchema = customerSchema
