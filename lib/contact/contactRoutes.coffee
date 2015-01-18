contactApi = require './contactApi'

contactRoutes = (app) ->
  app.get   '/contacts'     , contactApi.findAll
  app.get   '/contacts/:id' , contactApi.findById
  app.post  '/contacts'     , contactApi.save

module.exports = contactRoutes
