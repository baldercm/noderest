'use strict'

var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
chai.use(sinonChai)

var proxyquire = require('proxyquire')

describe('Place Router', function() {
  var placeApi = {}
  var router = {}

  before(function() {
    router.get = sinon.spy()
    router.post = sinon.spy()

    placeApi.findById = sinon.spy()
    placeApi.find = sinon.spy()

    proxyquire('../../lib/place/place-router', {
      'express': {
        Router: sinon.stub().returns(router)
      },
      './place-api': placeApi
    })
  })

  describe('GET /', function() {
    it('should define route', function() {
      expect(router.get).to.have.been.calledWith('/', placeApi.find)
    })
  })

  describe('GET /:id', function() {
    it('should define route', function() {
      expect(router.get).to.have.been.calledWith('/:id', placeApi.findById)
    })
  })

})
