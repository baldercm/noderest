'use strict'

supertest = require('supertest')
app = require('../../lib/core/server').app

describe 'Authentication e2e', ->

  describe 'unauthenticaded requests', ->
    agent = supertest.agent app

    it 'should get 401', (done) ->
      agent
        .get '/places'
        .expect 401
        .end done

  describe 'invalid credentials requests', ->
    agent = supertest.agent app

    it 'should get 401', (done) ->
      agent
        .get '/places'
        .auth 'noderest', 'wrongpassword'
        .expect 401
        .end done

  describe 'valid credentials requests', ->
    agent = supertest.agent app

    it 'should get 200', (done) ->
      agent
        .get '/places'
        .auth 'noderest', 'secret'
        .expect 200
        .end done
