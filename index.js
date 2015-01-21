'use strict'

require('coffee-script/register')

var noderest = require('./lib/core')

noderest.database.bootstrap()
noderest.app.bootstrap()
