const express = require('express')

const UserController = require('./controllers/UserController')
const GeralController = require('./controllers/GeralController')
const LoungeController = require('./controllers/Lounge/LoungeController')
const ProductController = require('./controllers/Product/ProductController')
const CategoryController = require('./controllers/Product/Category/CategoryController')

const routes = express.Router()

routes.post('/api/auth/login',  UserController.login)
routes.post('/api/auth/register', UserController.register)
routes.post('/api/auth/logout', UserController.verifyJWT, UserController.logout)
routes.post('/api/user/profile', UserController.verifyJWT, UserController.profile)
routes.get('/api/user/get-photo', UserController.verifyJWT, GeralController.getPhoto)
routes.get('/api/user/info', UserController.verifyJWT, UserController.info)
routes.get('/api/user/get-role', UserController.verifyJWT, GeralController.getRole)
routes.post('/api/dashboard', UserController.verifyJWT, GeralController.dashboard)
routes.post('/api/lounge/register', LoungeController.register)
routes.get('/api/lounge/get-all', UserController.verifyJWT, LoungeController.getAll)
routes.post('/api/lounge/get-image', UserController.verifyJWT, LoungeController.getImage)
routes.post('/api/product/upload-image', UserController.verifyJWT, ProductController.uploadImage)
routes.post('/api/lounge/upload-image', UserController.verifyJWT, LoungeController.uploadImage)
routes.post('/api/lounge/delete', UserController.verifyJWT, LoungeController.delete)
routes.post('/api/lounge/update', UserController.verifyJWT, LoungeController.update)
routes.post('/api/user/upload-image', UserController.verifyJWT, UserController.uploadImage)
routes.post('/api/product/register', UserController.verifyJWT, ProductController.register)
routes.get('/api/category/get-all', UserController.verifyJWT, CategoryController.getCategory)
routes.get('/api/health', UserController.health)

module.exports = routes