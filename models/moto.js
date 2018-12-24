'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const MotoSchema = Schema({
    marca: { type: string },
    modelo: { type: string }
})
module.exports = mongoose.model('moto', MotoSchema)