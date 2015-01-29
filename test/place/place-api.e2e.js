'use strict'

var chai = require('chai')
var expect = chai.expect

var supertest = require('supertest')

var noderest = require('../../lib/core')
var app = require('../../lib/core/server').app

describe('Place API e2e', function() {

  before(function() {
    noderest.bootstrap(8081)
  })

  describe('/places/:id', function() {
    var agent = supertest.agent(app)
    it('should get a single place by id', getPlace('52ef69b5e4b09d399c7befe4', agent))
  })

  describe('/places', function() {
    var agent = supertest.agent(app)
    it('should get all places', function(done) {
      agent
        .get('/places')
        .auth('noderest', 'secret')
        .accept('application/json')
        .end(function(err, res) {
          expect(res.status).to.equal(200)
          expect(res.type).to.match(/json/)
          expect(res.body).to.be.instanceof(Array)

          return done()
        })
    })
  })

  after(function() {
    noderest.shutdown()
  })

  function getPlace(id, agent) {
    return function(done) {
      agent
        .get('/places/' + id) // 52ef69b5e4b09d399c7befe4
        .auth('noderest', 'secret')
        .accept('application/json')
        .end(function(err, res) {
          expect(res.status).to.equal(200)
          expect(res.type).to.match(/json/)
          expect(res.body.id).to.equal(id)

          return done()
        })
    };
  }

})
