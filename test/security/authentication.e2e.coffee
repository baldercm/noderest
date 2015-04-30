'use strict'

Q = require('q')
chai = require('chai')
expect = chai.expect
supertest = require('supertest')
server = require('../../lib/core/server').server
bcrypt = require('bcrypt')
User = require('../../lib/core/security/user-model').User
Customer = require('../../lib/customer/customer-model').Customer

describe 'Authentication e2e', ->
  user = undefined
  customer = undefined

  createUser = ->
    salt = bcrypt.genSaltSync 10
    hash = bcrypt.hashSync 'secret', salt

    Q.ninvoke(User, 'create', {
      email: 'noderest@email.com'
      password: hash
      roles: ['ROLE_USER']
    }).then (_user) ->
      user = _user

  createCustomer = ->
    Q.ninvoke(Customer, 'create', {
      email: user.email
      alias: 'noderest'
      userId: user._id
    }).then (_customer) ->
      customer = _customer

  removeUser = ->
    Q.ninvoke(User, 'remove', {})

  removeCustomer = ->
    Q.ninvoke(Customer, 'remove', {})

  beforeEach (done) ->
    createUser()
    .then(createCustomer)
    .done ->
      done()

  afterEach (done) ->
    removeUser()
    .then(removeCustomer)
    .done ->
      done()

  describe 'unauthenticaded requests', ->
    it 'should get 401', (done) ->
      supertest(server)
        .get '/customers/me'
        .expect 401
        .end done

  describe 'invalid username requests', ->
    it 'should get 401', (done) ->
      supertest(server)
      .get '/customers/me'
      .auth 'wronguser@email.com', 'wrongpassword'
      .expect 401
      .end done

  describe 'invalid credentials requests', ->
    it 'should get 401', (done) ->
      supertest(server)
        .get '/customers/me'
        .auth 'noderest@email.com', 'wrongpassword'
        .expect 401
        .end done

  describe 'valid credentials no customer', (done) ->
    beforeEach (done) ->
      removeCustomer()
      .done ->
        done()

    it 'should get 204', (done) ->
      supertest(server)
      .get '/customers/me'
      .auth 'noderest@email.com', 'secret'
      .expect (res) ->
        expect(res.status).to.equal 204
        expect(res.type).to.equal ''
        return
      .end done

  describe 'valid credentials', ->
    it 'should get 200', (done) ->
      supertest(server)
        .get '/customers/me'
        .auth 'noderest@email.com', 'secret'
        .expect (res) ->
          expect(res.status).to.equal 200
          expect(res.type).to.match /json/
          expect(res.body.email).to.equal customer.email
          expect(res.body.alias).to.equal customer.alias
          return
        .end done
