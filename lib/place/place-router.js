'use strict'

var express = require('express')
var placeApi = require('./place-api')

var router = express.Router()

router.get('/', placeApi.find)
router.get('/:id', placeApi.findById)

module.exports = router
