'use strict'

function schemaToJsonTransform(schema) {
  schema.set('toJSON', {
    transform: function (doc, ret) {
      ret.id = ret._id

      delete ret._id
      delete ret._class
    }
  })
}

module.exports = schemaToJsonTransform
