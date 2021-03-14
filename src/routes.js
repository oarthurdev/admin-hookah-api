const express = require('express')

const UserController = require('./controllers/UserController')
const GeralController = require('./controllers/GeralController')
const LoungeController = require('./controllers/Lounge/LoungeController')

const routes = express.Router()

routes.post('/login',  UserController.login)
routes.post('/register', UserController.register)
routes.post('/logout', UserController.logout)
routes.post('/dashboard', GeralController.dashboard)
routes.post('/lounge/register', LoungeController.register)

// routes.get('/company', UserController.auth, CompanyController.index)

// routes.post('/company/update', UserController.auth, CompanyController.update)

module.exports = routes