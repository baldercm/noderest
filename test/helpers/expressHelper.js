var sinon = require('sinon')

var expressApp = {
  get: sinon.spy(),
  post: sinon.spy(),
  put: sinon.spy(),
  delete: sinon.spy(),
  head: sinon.spy()
}

module.exports = expressApp
