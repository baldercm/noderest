'use strict'

var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
chai.use(sinonChai)

var proxyquire = require('proxyquire')

describe('Place API', function() {
  var placeApi, Place

  before(function () {
    Place = {
      findById: sinon.stub(),
      find: sinon.stub(),
      geoNear: sinon.stub()
    }
    placeApi = proxyquire('../../lib/place/place-api', {
      './place-model': {
        Place: Place
      }
    })
  })

  describe('find', function() {
    var req, res, next

    beforeEach(function () {
      next = sinon.spy()
    })

    describe('on present latitude & longitude', function() {
      beforeEach(function () {
        req = {
          query: { latitude: 11.22, longitude: 22.33 }
        }

        sinon.stub(placeApi, 'findAround')

        placeApi.find(req, res, next)
      })

      it('should forward to Place.findAround', function () {
        expect(placeApi.findAround).to.have.been.called
      })

      afterEach(function () {
        placeApi.findAround.restore()
      })
    })

    describe('on missing latitude & longitude', function() {
      beforeEach(function () {
        req = {
          query: { }
        }

        sinon.stub(placeApi, 'findAll')

        placeApi.find(req, res, next)
      })

      it('should forward to Place.findAll', function () {
        expect(placeApi.findAll).to.have.been.called
      })

      afterEach(function () {
        placeApi.findAll.restore()
      })

    })
  })

  describe('findById', function() {
    var req, res, next

    beforeEach(function() {
      req = {
        params: { id: 'placeId' }
      }

      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      }

      next = sinon.spy()

      placeApi.findById(req, res, next)
    })

    it('should find place by id', function() {
      expect(Place.findById).to.have.been.calledWith('placeId')
    })

    describe('on success', function() {
      beforeEach(function() {
        Place.findById.yield(false, 'place')
      })

      it('should return status 200', function() {
        expect(res.status).to.have.been.calledWith(200)
      })

      it('should return json places', function() {
        expect(res.json).to.have.been.calledWith('place')
      })

      it('should call next', function() {
        expect(next).to.have.been.called
      })
    })

    describe('on error', function() {
      beforeEach(function() {
        Place.findById.yield('findById place error', { })
      })

      it('should return status 500', function() {
        expect(res.status).to.have.been.calledWith(500)
      })

      it('should return json error', function() {
        expect(res.json).to.have.been.calledWith({ error: 'findById place error' })
      })

      it('should call next', function() {
        expect(next).to.have.been.called
      })
    })
  })

  describe('findAll', function() {
    var req, res, next

    beforeEach(function() {
      req = {}

      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      }

      next = sinon.spy()

      placeApi.findAll(req, res, next)
    })

    it('should find all places', function() {
      expect(Place.find).to.have.been.calledWith()
    })

    describe('on success', function() {
      beforeEach(function() {
        Place.find.yield(false, 'places')
      })

      it('should return status 200', function() {
        expect(res.status).to.have.been.calledWith(200)
      })

      it('should return json places', function() {
        expect(res.json).to.have.been.calledWith('places')
      })

      it('should call next', function() {
        expect(next).to.have.been.called
      })
    })

    describe('on error', function() {
      beforeEach(function() {
        Place.find.yield('find places error', { })
      })

      it('should return status 500', function() {
        expect(res.status).to.have.been.calledWith(500)
      })

      it('should return json error', function() {
        expect(res.json).to.have.been.calledWith({ error: 'find places error' })
      })

      it('should call next', function() {
        expect(next).to.have.been.called
      })
    })
  })
})
