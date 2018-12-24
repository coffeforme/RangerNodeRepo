'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const motoSchema = Schema({
    marca: { type: String },
    modelo: { type: String }
})

const perfilSchema = Schema({
    name: { type: String },
    birth: { type: Date },
    moto: { type: Schema.Types.ObjectId, ref: 'moto' },
    dateCreated: { type: Date, default: Date.now() },
    lastDate: { type: Date }
})

const usuarioSchema = Schema({
    email: { type: String, unique: true, lowercase: true },
    user: { type: String, unique: true, lowercase: true },
    profile: { type: Schema.Types.ObjectId, ref: 'profile' },
    avatar: String,
    pass: { type: String, select: false },
    fechaCreacion: { type: Date, default: Date.now() },
    ultimoIngreso: Date
})

usuarioSchema.pre('save', function (next) {
    let user = this
    if (!user.isModified('pass')) return next()
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(user.pass, salt, (err, phas) => {
            if (err) return next(err)
            user.pass = phas
            next()
        })
    })
})

usuarioSchema.methods.gravatar = function () {
    if (!this.pass) return "https://gravatar.com/avatar?s=200&d=retro"

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')

    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
}

usuarioSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.pass, (err, isMatch) => {
        cb(err, isMatch)
    });
}
const Moto = mongoose.model('moto', motoSchema);
const Profile = mongoose.model('profile', perfilSchema);
const User = mongoose.model('user', usuarioSchema);
module.exports = User