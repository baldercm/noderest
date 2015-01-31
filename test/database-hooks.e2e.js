'use strict'

var database = require('../lib/core/database')

before(function() {
  database.bootstrap()
})

after(function() {
  database.shutdown()
})
