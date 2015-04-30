'use strict'

var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
chai.use(sinonChai)

var proxyquire = require('proxyquire')

describe('Place Router', function() {
  var placeApiV1 = {}
  var placeApi = {
    v1: placeApiV1
  }
  var server = {}

  before(function() {
    server.get = sinon.spy()

    placeApiV1.findById = sinon.spy()
    placeApiV1.find = sinon.spy()

    var placeRouter = proxyquire('../../lib/place/place-router', {
      './place-api': placeApi
    })
    placeRouter(server)
  })

  describe('GET /', function() {
    it('should define route', function() {
      expect(server.get).to.have.been.calledWith({path: '/places', version: '1.0.0'}, placeApiV1.find)
    })
  })

  describe('GET /:id', function() {
    it('should define route', function() {
      expect(server.get).to.have.been.calledWith({path: '/places/:id', version: '1.0.0'}, placeApiV1.findById)
    })
  })

})
