const express = require('express')
const routers= express.Router()
const middlewareGlobal = require('./src/middlewares/middlewaresGlobal')

const loginController = require('./src/controllers/loginController')
const homeController = require('./src/controllers/homeController')

routers.get('/',loginController.index)
routers.post('/login',loginController.loginUser)
routers.get('/createdUser',loginController.createUser)
routers.post('/createdUser',loginController.insertUserDB)

routers.get('/home',middlewareGlobal.checkSessionActive, homeController.index)
routers.get('/exit',middlewareGlobal.checkSessionActive,middlewareGlobal.exit)

routers.get('/new_contacts',middlewareGlobal.checkSessionActive,homeController.redirectCreatedContats)
routers.post('/new_contacts',middlewareGlobal.checkSessionActive,homeController.addContats)

routers.get('/deleted/:id',middlewareGlobal.checkSessionActive,homeController.deletedContacts)
routers.get('/editedContats/:id',middlewareGlobal.checkSessionActive,homeController.redirectUpdatedContats)

module.exports = routers
