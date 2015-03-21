'use strict'

var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  email: String,
  password: String,
  roles: [String]
})

userSchema.index({ email: 1 })

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id

    delete ret._id
    delete ret._class
    delete ret.password
  }
})

var User = mongoose.model('User', userSchema, 'securityUser')

module.exports.User = User
module.exports.userSchema = userSchema
