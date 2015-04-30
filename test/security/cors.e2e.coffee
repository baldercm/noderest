'use strict'

supertest = require('supertest')
server = require('../../lib/core/server').server

describe 'Cors e2e', ->

  server.get '/cors', (req, res) ->
    res.send('ok')

  describe 'preflight requests', ->

    it 'should set header Access-Control-Allow-Origin', (done) ->
      supertest(server)
        .options '/cors'
        .set 'Origin', 'http://e2e.noderest.org'
        .set 'Access-Control-Request-Method', 'GET'
        .expect 200
        .expect 'Access-Control-Allow-Origin', 'http://e2e.noderest.org'
        .end done

    it 'should set header Access-Control-Allow-Methods', (done) ->
      supertest(server)
        .options '/cors'
        .set 'Origin', 'http://e2e.noderest.org'
        .set 'Access-Control-Request-Method', 'GET'
        .expect 200
        .expect 'Access-Control-Allow-Methods', 'GET'
        .end done

    it 'should set header Access-Control-Allow-Headers', (done) ->
      supertest(server)
        .options '/cors'
        .set 'Origin', 'http://e2e.noderest.org'
        .set 'Access-Control-Request-Method', 'GET'
        .expect 200
        .expect 'Access-Control-Allow-Headers',
          'accept, accept-version, content-type, request-id, origin, x-api-version, x-request-id, authorization, x-requested-with, fbtoken'
        .end done

    it 'should set header Access-Control-Allow-Credentials', (done) ->
      supertest(server)
        .options '/cors'
        .set 'Origin', 'http://e2e.noderest.org'
        .set 'Access-Control-Request-Method', 'GET'
        .expect 200
        .expect 'Access-Control-Allow-Credentials', 'true'
        .end done

  describe 'standard requests', ->
    it 'should set header Access-Control-Allow-Origin', (done) ->
      supertest(server)
        .get '/cors'
        .auth 'noderest', 'secret'
        .set 'Origin', 'http://e2e.noderest.org'
        .expect 200
        .expect 'Access-Control-Allow-Origin', 'http://e2e.noderest.org'
        .end done

    it 'should set header Access-Control-Allow-Credentials', (done) ->
      supertest(server)
        .get '/cors'
        .auth 'noderest', 'secret'
        .set 'Origin', 'http://e2e.noderest.org'
        .expect 200
        .expect 'Access-Control-Allow-Credentials', 'true'
        .end done
