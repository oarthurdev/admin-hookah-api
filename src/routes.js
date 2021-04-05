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
routes.post('/user/profile', UserController.profile)
routes.post('/user/get-photo', GeralController.getPhoto)
routes.post('/user/get-role', GeralController.getRole)
routes.post('/dashboard', GeralController.dashboard)
routes.post('/lounge/register', LoungeController.register)
routes.post('/lounge/get-all', LoungeController.getAll)
routes.post('/lounge/get-image', LoungeController.getImage)
routes.post('/product/upload-image', ProductController.uploadImage)
routes.post('/lounge/upload-image', LoungeController.uploadImage)
routes.post('/user/upload-image', UserController.uploadImage)
routes.post('/product/register', ProductController.register)
routes.get('/category/get-all', CategoryController.getCategory)

module.exports = routes