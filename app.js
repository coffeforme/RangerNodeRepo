'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const auth = require('./middlewares/auth')


var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};

//middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors(corsOptions))

//routes
app.use('/auth', routes.apiauth)
app.use('/user', auth, routes.apiuser)

module.exports = app