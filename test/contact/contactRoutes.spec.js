var chai = require('chai')
var expect = chai.expect
var proxyquire = require('proxyquire')
var expressHelper = require('../helpers/expressHelper')
var contactApi = { }
var contactRoutes = proxyquire('../../lib/contact/contactRoutes', {
  './contactApi': contactApi
})

describe('Contact Routes', function() {
  describe('POST /contacts', function() {
    beforeEach(function() {
      contactApi.save = 'saveHandler'

      contactRoutes(expressHelper)
    })

    it('should define url and handler', function() {
      expect(expressHelper.post).to.have.been.calledWith('/contacts', 'saveHandler')
    })
  })

  describe('GET /contacts/:id', function() {
    beforeEach(function() {
      contactApi.findById = 'findOneHandler'

      contactRoutes(expressHelper)
    })

    it('should define url and handler', function() {
      expect(expressHelper.get).to.have.been.calledWith('/contacts/:id', 'findOneHandler')
    })
  })

  describe('GET /contacts', function() {
    beforeEach(function() {
      contactApi.findAll = 'findAllHandler'

      contactRoutes(expressHelper)
    })

    it('should define url and handler', function() {
      expect(expressHelper.get).to.have.been.calledWith('/contacts', 'findAllHandler')
    })
  })
})
