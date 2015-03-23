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
  user = undefined
  customer = undefined

  before (done) ->
    createUser = ->
      salt = bcrypt.genSaltSync 10
      hash = bcrypt.hashSync 'secret', salt

      Q.ninvoke(User, 'create', {
        email: 'noderest@email.com'
        password: hash
      }).then (_user) ->
        user = _user

    createCustomer = ->
      Q.ninvoke(Customer, 'create', {
        email: user.email
        alias: 'noderest'
        userId: user._id
      }).then (_customer) ->
        customer = _customer

    createUser()
    .then(createCustomer)
    .done ->
      done()

  after (done) ->
    removeUser = ->
      Q.ninvoke(User, 'remove', {})

    removeCustomer = ->
      Q.ninvoke(Customer, 'remove', {})

    removeUser()
    .then(removeCustomer)
    .done ->
      done()

  describe 'unauthenticaded requests', ->
    agent = supertest.agent app

    it 'should get 401', (done) ->
      agent
        .get '/customers/me'
        .expect 401
        .end done

  describe 'invalid username requests', ->
    agent = supertest.agent app

    it 'should get 401', (done) ->
      agent
      .get '/customers/me'
      .auth 'wronguser@email.com', 'wrongpassword'
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
          expect(res.body.email).to.equal customer.email
          expect(res.body.alias).to.equal customer.alias
          return
        .end done
