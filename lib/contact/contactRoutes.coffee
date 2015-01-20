express = require 'express'
contactApi = require './contactApi'

module.exports = (app) ->
  router = express.Router()
  router.get   '/contacts'     , contactApi.findAll
  router.get   '/contacts/:id' , contactApi.findById
  router.post  '/contacts'     , contactApi.save

  app.use(router)
  return
