'use strict'

var noderest = require('./lib/core')

noderest.bootstrap()

var shutdown = function () {
  noderest.shutdown(function () {
    process.exit(0)
  })
};

process.on('SIGINT', shutdown)  // ctrl-C
process.on('SIGUSR2', shutdown) // nodemon restart
