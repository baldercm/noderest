'use strict'

var
  Q = require('q'),
  chai = require('chai'),
  expect = chai.expect,
  chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

describe('Promise', function() {
  var promise

  beforeEach(function() {
    promise = Q.when('promised value')
  })

  it('should resolve', function() {
    return expect(promise).to.become('promised value')
  })

})
