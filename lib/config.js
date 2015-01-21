'use strict'

var config

if ('dev' === process.env.NODE_ENV) {
  config = {
    dbUri: 'mongodb://localhost/voltio-dev'
  }

} else if ('docker' === process.env.NODE_ENV) {
  config = {
    dbUri: 'mongodb://mongodb/noderest'
  }

} else if ('aws' === process.env.NODE_ENV) {
  config = {
    dbUri: 'mongodb://noderest:noderest@ds033841.mongolab.com:33841/noderest'
  }

}else {
  config = {
    dbUri: 'mongodb://localhost/voltio-dev'
  }
}

module.exports = config
