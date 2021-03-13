  
const http = require('http')
const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const dotenv = require('dotenv').config()
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors());
app.use(express.json());
app.use(routes);
 
const server = http.createServer(app)

server.listen(process.env.PORT)

console.log('Server listening on port ' + process.env.PORT)