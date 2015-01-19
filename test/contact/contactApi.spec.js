'use strict'

var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var chaiAsPromised = require('chai-as-promised')
var proxyquire = require('proxyquire')
var contactModel = { }
var contactApi = proxyquire('../../lib/contact/contactApi', {
  './contactModel': contactModel
})

chai.use(sinonChai)
chai.use(chaiAsPromised)

describe('Contact API', function() {

  describe('save', function() {
    var req, res, next, contact, Contact

    beforeEach(function() {
      req = {
        params: { name: 'John Doe'}
      }

      contact = {
        save: sinon.stub()
      }

      Contact = contactModel.Contact = sinon.stub().returns(contact)

      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      }

      next = sinon.spy()

      contactApi.save(req, res, next)
    })

    it('should create new contact', function() {
      expect(contactModel.Contact).to.have.been.called
    })

    it('should save new contact', function() {
      expect(contact.save).to.have.been.called
    })

    describe('on save success', function() {
      beforeEach(function() {
        contact.save.yield(false, { _id: 'contactId' })
      })

      it('should return status 201', function() {
        expect(res.status).to.have.been.calledWith(201)
      })

      it('should return json id', function() {
        expect(res.json).to.have.been.calledWith({ id: 'contactId'})
      })

      it('should call next', function() {
        expect(next).to.have.been.called
      })
    })

    describe('on save error', function() {
      beforeEach(function() {
        contact.save.yield('save contact error', { })
      })

      it('should return status 500', function() {
        expect(res.status).to.have.been.calledWith(500)
      })

      it('should return json error', function() {
        expect(res.json).to.have.been.calledWith({ error: 'save contact error' })
      })

      it('should call next', function() {
        expect(next).to.have.been.called
      })
    })
  })

  describe('findById', function() {
    var req, res, next, findById

    beforeEach(function() {
      req = {
        params: { id: 'contactId'}
      }

      findById = contactModel.Contact.findById = sinon.stub()

      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      }

      next = sinon.spy()

      contactApi.findById(req, res, next)
    })

    it('should find contact by id', function() {
      expect(findById).to.have.been.called
    })

    describe('on findById success', function() {
      beforeEach(function() {
        findById.yield(false, 'contact')
      })

      it('should return status 200', function() {
        expect(res.status).to.have.been.calledWith(200)
      })

      it('should return json contacts', function() {
        expect(res.json).to.have.been.calledWith('contact')
      })

      it('should call next', function() {
        expect(next).to.have.been.called
      })
    })

    describe('on findById error', function() {
      beforeEach(function() {
        findById.yield('findById contact error', { })
      })

      it('should return status 500', function() {
        expect(res.status).to.have.been.calledWith(500)
      })

      it('should return json error', function() {
        expect(res.json).to.have.been.calledWith({ error: 'findById contact error' })
      })

      it('should call next', function() {
        expect(next).to.have.been.called
      })
    })
  })

  describe('findAll', function() {
    var req, res, next, find

    beforeEach(function() {
      req = { }

      find = contactModel.Contact.find = sinon.stub()

      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      }

      next = sinon.spy()

      contactApi.findAll(req, res, next)
    })

    it('should find all contacts', function() {
      expect(find).to.have.been.called
    })

    describe('on find success', function() {
      beforeEach(function() {
        find.yield(false, 'contacts')
      })

      it('should return status 200', function() {
        expect(res.status).to.have.been.calledWith(200)
      })

      it('should return json contacts', function() {
        expect(res.json).to.have.been.calledWith('contacts')
      })

      it('should call next', function() {
        expect(next).to.have.been.called
      })
    })

    describe('on find error', function() {
      beforeEach(function() {
        find.yield('find contacts error', { })
      })

      it('should return status 500', function() {
        expect(res.status).to.have.been.calledWith(500)
      })

      it('should return json error', function() {
        expect(res.json).to.have.been.calledWith({ error: 'find contacts error' })
      })

      it('should call next', function() {
        expect(next).to.have.been.called
      })
    })
  })
})
