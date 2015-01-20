'use strict'

var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
chai.use(sinonChai)
var proxyquire = require('proxyquire')
var express = { }
var contactApi = { }
var contactRoutes = proxyquire('../../lib/contact/contactRoutes', {
  'express': express,
  './contactApi': contactApi
})

describe('Contact Routes', function() {
  var app = {}
  var router = {}

  beforeEach(function() {
    express.Router = sinon.stub().returns(router)

    router.get = sinon.spy()
    router.post = sinon.spy()

    contactApi.save = sinon.spy()
    contactApi.findById = sinon.spy()
    contactApi.findAll = sinon.spy()

    app.use = sinon.spy()

    contactRoutes(app)
  })

  describe('POST /contacts', function() {
    it('should define route', function() {
      expect(router.post).to.have.been.calledWith('/contacts', contactApi.save)
    })
  })

  describe('GET /contacts/:id', function() {
    it('should define route', function() {
      expect(router.get).to.have.been.calledWith('/contacts/:id', contactApi.findById)
    })
  })

  describe('GET /contacts', function() {
    it('should define route', function() {
      expect(router.get).to.have.been.calledWith('/contacts', contactApi.findAll)
    })
  })

  it('should invoke use(router)', function() {
    expect(app.use).to.have.been.calledWith(router)
  })
})
