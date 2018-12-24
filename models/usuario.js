'use strict'

const mongoose = require('mongoose')
const ProfileSchema = require('./profile')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const UsuarioSchema = Schema({
    email: { type: String, unique: true, lowercase: true },
    user: { type: String, unique: true, lowercase: true },
    profile: { type: ProfileSchema },
    avatar: String,
    pass: { type: String, select: false },
    fechaCreacion: { type: Date, default: Date.now() },
    ultimoIngreso: Date
})

UsuarioSchema.pre('save', function (next) {
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

UsuarioSchema.methods.gravatar = function () {
    if (!this.pass) return "https://gravatar.com/avatar?s=200&d=retro"

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')

    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
}

UsuarioSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.pass, (err, isMatch) => {
        cb(err, isMatch)
    });
}

module.exports = mongoose.model('users', UsuarioSchema)