'use strict'

function schemaToJsonTransform(schema) {
  schema.set('toJSON', {
    transform: function (doc, ret) {
      ret.id = ret._id

      delete ret._id
      delete ret.__v
    }
  })
}

module.exports = schemaToJsonTransform
