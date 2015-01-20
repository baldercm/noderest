'use strict'

Q = require 'q'
chai = require 'chai'
expect = chai.expect
chaiAsPromised = require 'chai-as-promised'
chai.use chaiAsPromised

describe 'Promise Coffee', ->
  promise = undefined

  beforeEach ->
    promise = Q 'promised value'
    return

  it 'should resolve', ->
    expect(promise).to.become 'promised value'
    return

  return
