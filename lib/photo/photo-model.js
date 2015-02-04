'use strict'

var mongoose = require('mongoose')

var thumbnailSchema = new mongoose.Schema({
  imageURL: String,
  thumbnailSize: { type: String, enum: ['SMALL', 'MEDIUM', 'LARGE'] }
})

thumbnailSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.url = ret.imageURL

    delete ret.imageURL
  }
})

var photoSchema = new mongoose.Schema({
  name: String,
  imageURL: String,
  imageFileIdentifier: String,
  thumbnails: [thumbnailSchema]
})

photoSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.url = ret.imageURL
    ret.imageFileId = ret.imageFileIdentifier

    delete ret.imageURL
    delete ret.imageFileIdentifier
  }
})


module.exports.thumbnailSchema = thumbnailSchema
module.exports.photoSchema = photoSchema
