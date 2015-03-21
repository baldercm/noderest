'use strict'

Q = require('q')
chai = require('chai')
expect = chai.expect
supertest = require('supertest')
app = require('../../lib/core/server').app
bcrypt = require('bcrypt')
User = require('../../lib/core/security/user-model').User
Customer = require('../../lib/customer/customer-model').Customer

describe 'Authentication e2e', ->

  createUser = () ->
    salt = bcrypt.genSaltSync 10
    hash = bcrypt.hashSync 'secret', salt

    Q.ninvoke(User, 'create', {
      email: 'noderest@email.com'
      password: hash
    })

  createCustomer = (user) ->
    Q.ninvoke(Customer, 'create', {
      email: user.email
      alias: 'noderest'
    })

  before (done) ->
    createUser()
    .then(createCustomer)
    .done ->
      done()

  describe 'unauthenticaded requests', ->
    agent = supertest.agent app

    it 'should get 401', (done) ->
      agent
        .get '/customers/me'
        .expect 401
        .end done

  describe 'invalid credentials requests', ->
    agent = supertest.agent app

    it 'should get 401', (done) ->
      agent
        .get '/customers/me'
        .auth 'noderest@email.com', 'wrongpassword'
        .expect 401
        .end done

  describe 'valid credentials requests', ->
    agent = supertest.agent app

    it 'should get 200', (done) ->
      agent
        .get '/customers/me'
        .auth 'noderest@email.com', 'secret'
        .expect (res) ->
          expect(res.status).to.equal 200
          expect(res.type).to.match /json/
          return
        .end done
