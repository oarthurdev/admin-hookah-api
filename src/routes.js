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
routes.post('/user/profile', UserController.verifyJWT, UserController.profile)
routes.post('/user/get-photo', UserController.verifyJWT, GeralController.getPhoto)
routes.post('/user/get-role', UserController.verifyJWT, GeralController.getRole)
routes.post('/dashboard', UserController.verifyJWT, GeralController.dashboard)
routes.post('/lounge/register', LoungeController.register)
routes.post('/lounge/get-all', UserController.verifyJWT, LoungeController.getAll)
routes.post('/lounge/get-image', UserController.verifyJWT, LoungeController.getImage)
routes.post('/product/upload-image', UserController.verifyJWT, ProductController.uploadImage)
routes.post('/lounge/upload-image', UserController.verifyJWT, LoungeController.uploadImage)
routes.post('/lounge/delete', UserController.verifyJWT, LoungeController.delete)
routes.post('/lounge/update', UserController.verifyJWT, LoungeController.update)
routes.post('/user/upload-image', UserController.verifyJWT, UserController.uploadImage)
routes.post('/product/register', UserController.verifyJWT, ProductController.register)
routes.get('/category/get-all', UserController.verifyJWT, CategoryController.getCategory)

module.exports = routes