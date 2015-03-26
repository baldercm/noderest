'use strict'

var _ = require('underscore')
var ConnectRoles = require('connect-roles')

/* jshint unused:false */
var roles = new ConnectRoles({
  failureHandler: function(req, res, action) {
    res.sendStatus(403)
  }
})
/* jshint unused:true */

roles.use(function (req, action) {
  return _.contains(req.user.roles, action)
})

module.exports.roles = roles
