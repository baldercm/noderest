'use strict'

var _ = require('underscore')
var chai = require('chai')
var expect = chai.expect

var supertest = require('supertest')

var app = require('../../lib/core/server').app

var Place = require('../../lib/place/place-model').Place

describe('Place e2e', function() {
  var places = []

  before(function(done) {
    Place.create(
      { name: 'Place 1', location: [40.00, 30.00], beaconDevice:{majorId: '1234', minorIds: ['1234', '5678']} },
      { name: 'Place 2', location: [40.00, 30.00] },
      { name: 'Place 3', location: [40.00, 30.00] },
      { name: 'Place 4', location: [55.00, 55.00] },
      function(err, place1, place2, place3, place4) {
        if (err) {
          throw err
        } else {
          places.push(place1)
          places.push(place2)
          places.push(place3)
          places.push(place4)

          done()
        }
      }
    )
  })

  describe('/places/:id', function() {
    var agent = supertest.agent(app)

    describe('on valid id', function() {
      it('should get the place', function(done) {
        var place = places[0]

        agent
          .get('/places/' + place.id)
          .auth('noderest', 'secret')
          .accept('application/json')
          .expect(function(res) {
            expect(res.status).to.equal(200)
            expect(res.type).to.match(/json/)
            expect(res.body.id).to.equal(place.id)
            expect(res.body.name).to.equal(place.name)
          })
          .end(done)
      })
    })

    describe('on wrong id', function() {
      it('should get an error', function(done) {
        agent
          .get('/places/anyWrongId')
          .auth('noderest', 'secret')
          .accept('application/json')
          .expect(function(res) {
            expect(res.status).to.equal(400)
            expect(res.type).to.match(/json/)
          })
          .end(done)
      })
    })
  })

  describe('/places', function() {
    var agent = supertest.agent(app)

    describe('on empty query', function() {
      it('should get all places', function(done) {
        agent
          .get('/places')
          .auth('noderest', 'secret')
          .accept('application/json')
          .expect(function(res) {
            expect(res.status).to.equal(200)
            expect(res.type).to.match(/json/)
            expect(res.body).to.be.instanceof(Array)
            expect(res.body.length).to.equal(4)
          })
          .end(done)
      })
    })
  })

  describe('/places?latitude=1.23&longitude=2.34', function() {
    var agent = supertest.agent(app)

    describe('on valid query', function() {
      it('should get geonear places', function(done) {
        agent
          .get('/places?latitude=40.00&longitude=30.00')
          .auth('noderest', 'secret')
          .accept('application/json')
          .expect(function(res) {
            expect(res.status).to.equal(200)
            expect(res.type).to.match(/json/)
            expect(res.body).to.be.instanceof(Array)
            expect(res.body.length).to.equal(3)

            var placeNames = _.pluck(res.body, 'name')
            expect(placeNames).to.include.members(['Place 1', 'Place 2', 'Place 3'])
            expect(placeNames).not.to.include.members(['Place 4'])
          })
          .end(done)
      })
    })

    describe('on invalid query', function() {
      it('should get an error', function(done) {
        agent
          .get('/places?latitude=invalid&longitude=invalid')
          .auth('noderest', 'secret')
          .accept('application/json')
          .expect(function(res) {
            expect(res.status).to.equal(400)
            expect(res.type).to.match(/json/)
          })
          .end(done)
      })
    })
  })

  describe('/places?beaconMajorId=1234', function() {
    var agent = supertest.agent(app)

    describe('on valid query', function() {
      it('should get the place with the beacon majorId', function(done) {
        agent
          .get('/places?beaconMajorId=1234')
          .auth('noderest', 'secret')
          .accept('application/json')
          .expect(function(res) {
            expect(res.status).to.equal(200)
            expect(res.type).to.match(/json/)
            expect(res.body).to.be.instanceof(Array)
            expect(res.body.length).to.equal(1)

            var placeNames = _.pluck(res.body, 'name')
            expect(placeNames).to.include.members(['Place 1'])
            expect(placeNames).not.to.include.members(['Place 2', 'Place 3', 'Place 4'])
          })
          .end(done)
      })
    })

    describe('on wrong majorId', function() {
      it('should get an empty array', function(done) {
        agent
          .get('/places?beaconMajorId=invalid')
          .auth('noderest', 'secret')
          .accept('application/json')
          .expect(function(res) {
            expect(res.status).to.equal(200)
            expect(res.type).to.match(/json/)
            expect(res.body).to.be.instanceof(Array)
            expect(res.body.length).to.equal(0)
          })
          .end(done)
      })
    })
  })

  //function getPlace(id, agent) {
  //  return function(done) {
  //    agent
  //      .get('/places/' + id) // 52ef69b5e4b09d399c7befe4
  //      .auth('noderest', 'secret')
  //      .accept('application/json')
  //      .end(function(err, res) {
  //        expect(res.status).to.equal(200)
  //        expect(res.type).to.match(/json/)
  //        expect(res.body.id).to.equal(id)
  //
  //        return done()
  //      })
  //  }
  //}

})
