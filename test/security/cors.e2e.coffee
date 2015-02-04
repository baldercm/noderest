'use strict'

supertest = require('supertest')
app = require('../../lib/core/server').app

describe 'Cors e2e', ->

  app.get '/cors', (req, res) ->
    res.sendStatus(200)

  describe 'preflight requests', ->
    agent = supertest.agent app

    it 'should set header Access-Control-Allow-Origin', (done) ->
      agent
        .options '/cors'
        .set 'Origin', 'http://e2e.noderest.org'
        .expect 'Access-Control-Allow-Origin', 'http://e2e.noderest.org'
        .end done

    it 'should set header Access-Control-Allow-Methods', (done) ->
      agent
        .options '/cors'
        .expect 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD, OPTIONS'
        .end done

    it 'should set header Access-Control-Allow-Headers', (done) ->
      agent
        .options '/cors'
        .expect 'Access-Control-Allow-Headers', 'Authorization, X-Requested-With, Origin, Fbtoken, Content-Type, Accept'
        .end done

    it 'should set header Access-Control-Allow-Credentials', (done) ->
      agent
        .options '/cors'
        .expect 'Access-Control-Allow-Credentials', 'true'
        .end done

  describe 'standard requests', ->
    agent = supertest.agent app

    it 'should set header Access-Control-Allow-Origin', (done) ->
      agent
        .get '/cors'
        .auth 'noderest', 'secret'
        .set 'Origin', 'http://e2e.noderest.org'
        .expect 'Access-Control-Allow-Origin', 'http://e2e.noderest.org'
        .end done

    it 'should set header Access-Control-Allow-Credentials', (done) ->
      agent
        .get '/cors'
        .auth 'noderest', 'secret'
        .expect 'Access-Control-Allow-Credentials', 'true'
        .end done
