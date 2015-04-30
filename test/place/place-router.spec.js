'use strict'

var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
chai.use(sinonChai)

var proxyquire = require('proxyquire')

describe('Place Router', function() {
  var placeApi = {}
  var server = {}

  before(function() {
    server.get = sinon.spy()

    placeApi.findById = sinon.spy()
    placeApi.find = sinon.spy()

    var placeRouter = proxyquire('../../lib/place/place-router', {
      './place-api': placeApi
    })
    placeRouter(server)
  })

  describe('GET /', function() {
    it('should define route', function() {
      expect(server.get).to.have.been.calledWith('/places', placeApi.find)
    })
  })

  describe('GET /:id', function() {
    it('should define route', function() {
      expect(server.get).to.have.been.calledWith('/places/:id', placeApi.findById)
    })
  })

})
