'use strict'

var Q = require('q')
var BasicStrategy = require('passport-http').BasicStrategy
var User = require('./user-model').User
var bcrypt = require('bcrypt')
var logger = require('../logger').logger

var basicStrategy = new BasicStrategy(
  {
    realm: 'noderest'
  },
  function (username, password, done) {
    Q.ninvoke(User, 'findOne', {email: username})
      .then(function(user) {
        if (!user) {
          return done(null, false)
        }

        Q.nfcall(bcrypt.compare, password, user.password)
          .then(function(passwordMatches) {
            if (!passwordMatches) {
              return done(null, false)
            }
            done(null, user)
          })
      })
      .catch(function(err) {
        logger.error(err)
        done(err)
      })
      .done()
  }
)

module.exports.basicStrategy = basicStrategy
