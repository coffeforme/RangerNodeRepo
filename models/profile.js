'use strict'

const mongoose = require('mongoose')
const MotoSchema = require('./moto')
const Schema = mongoose.Schema;
const PerfilSchema = Schema({
    nombre: { type: string },
    fechaNacimiento: { type: Date },
    moto: { MotoSchema },
    fechaCreacion: { type: Date, default: Date.now() },
    ultimoIngreso: Date
})
module.exports = mongoose.model('profile', PerfilSchema)