'use strict'

var noderest = require('./lib/core')

noderest.bootstrap()

process.on('SIGINT', function() {
  noderest.shutdown(function () {
    process.exit(0)
  })
})
