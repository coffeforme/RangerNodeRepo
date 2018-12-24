'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const MotoSchema = Schema({
    marca: { type: String },
    modelo: { type: String }
})
module.exports = mongoose.model('moto', MotoSchema)