'use strict'

const express = require('express')


const UsuarioController = require('../controllers/usuario')
const apiauth = express.Router()

apiauth.post('/login', UsuarioController.login)
apiauth.post('/register', UsuarioController.register)

const apiuser = express.Router()
apiuser.get('/profile', UsuarioController.getProfile)
apiuser.post('/create', UsuarioController.createProfile)

module.exports = { apiauth, apiuser }

