'use strict'

var placeApiV1 = require('./place-api').v1

function placeRouter(server) {
  server.get({path: '/places', version: '1.0.0'}, placeApiV1.find)
  server.get({path: '/places/:id', version: '1.0.0'}, placeApiV1.findById)
}

module.exports = placeRouter
