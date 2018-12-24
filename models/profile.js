'use strict'

const mongoose = require('mongoose')
const MotoSchema = require('./moto')
const Schema = mongoose.Schema;
const PerfilSchema = Schema({
    nombre: { type: String },
    fechaNacimiento: { type: Date },
    moto: { type: MotoSchema },
    fechaCreacion: { type: Date, default: Date.now() },
    ultimoIngreso: Date
})
module.exports = mongoose.model('profile', PerfilSchema)