'use strict'

const express = require('express')


const UsuarioController = require('../controllers/usuario')
const apiauth = express.Router()

apiauth.post('/login', UsuarioController.login)
apiauth.post('/register', UsuarioController.register)

module.exports.apiauth = apiauth

