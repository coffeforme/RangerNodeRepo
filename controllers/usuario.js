'use strict'

const usuario = require('../models/usuario')
const service = require('../services')

function login(req, res) {
    usuario.User.findOne({ user: req.body.user }, (err, user) => {
        console.log(user);
        if (err) return res.status(500).send({ msg: err })
        if (!user) return res.status(404).send({ msg: "El usurio no existe" })
        return user.comparePassword(req.body.pass, (err, isMatch) => {
            if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
            if (!isMatch) return res.status(404).send({ msg: `Error de contraseña: ${req.body.user}` })

            req.user = user
            return res.status(200).send({ msg: 'Te has logueado correctamente', token: service.createToken(user) })
        });

    }).select('_id email +pass');
}

function getProfile(req, res) {
    usuario.User.findOne({ _id: req.user }, (err, resp) => {
        if (err) return res.status(500).send({ msg: err })
        return res.status(200).send({ profile: resp.profile || null })
    }).select('profile');
}

function createProfile(req, res) {
    const profile = new usuario.Profile();
    profile.name = req.body.name;
    profile.birth = req.body.birth;
    profile.genre = req.body.genre;
    profile.complete = true;
    profile.lastDate = Date.now();
    usuario.User.findOne({ _id: req.user }, (err, doc) => {
        if (err) return res.status(500).send({ msg: err });

        doc.profile = profile;
        doc.save((err) => {
            if (err) return res.status(500).send({ msg: `Error al crear tu perfil ${err}` })

            res.status(200).send({ msg: "Continuemos!" })
        });
    })
}

function register(req, res) {
    const user = new usuario.User();
    user.email = req.body.email;
    user.user = req.body.user;
    user.pass = req.body.pass;
    user.avatar = user.gravatar();
    user.save((err) => {
        if (err) return res.status(500).send({ msg: `Error al crear el usuario ${err}` })

        res.status(200).send({ msg: "Te has registrado!", token: service.createToken(user) })
    });
}

module.exports = {
    login,
    register,
    getProfile,
    createProfile
}