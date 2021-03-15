const express = require('express')

const UserController = require('./controllers/UserController')
const GeralController = require('./controllers/GeralController')
const LoungeController = require('./controllers/Lounge/LoungeController')
const ProductController = require('./controllers/Product/ProductController')
const CategoryController = require('./controllers/Product/Category/CategoryController')

const routes = express.Router()

routes.post('/login',  UserController.login)
routes.post('/register', UserController.register)
routes.post('/logout', UserController.logout)
routes.post('/dashboard', GeralController.dashboard)
routes.post('/lounge/register', LoungeController.register)
routes.post('/lounge/get-all', LoungeController.getAll)
routes.post('/product/upload-image', ProductController.uploadImage)
routes.post('/product/register', ProductController.register)
routes.get('/category/get-all', CategoryController.getCategory)

// routes.get('/company', UserController.auth, CompanyController.index)

// routes.post('/company/update', UserController.auth, CompanyController.update)

module.exports = routes