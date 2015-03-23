'use strict'

function config() {
  if ('dev' === process.env.NODE_ENV) {
    return {
      dbUri: 'mongodb://localhost/noderest',
      consoleLogLevel: 'debug'
    }

  } else if ('test' === process.env.NODE_ENV) {
    return {
      dbUri: 'mongodb://localhost/noderest-e2e',
      consoleLogLevel: 'warn'
    }

  } else if ('docker' === process.env.NODE_ENV) {
    return {
      dbUri: 'mongodb://mongodb/noderest',
      consoleLogLevel: 'debug'
    }

  } else if ('aws' === process.env.NODE_ENV) {
    return {
      dbUri: 'mongodb://noderest:noderest@ds033841.mongolab.com:33841/noderest',
      consoleLogLevel: 'debug'
    }

  } else {
    return {
      dbUri: 'mongodb://localhost/noderest',
      consoleLogLevel: 'silent'
    }
  }
}

module.exports = config()
