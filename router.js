const express = require('express')
const routers= express.Router()
const homeController = require('./src/controllers/homeController')

routers.get('/',homeController.index)

module.exports = routers
