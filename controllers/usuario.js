'use strict'

const usuario = require('../models/usuario')
const service = require('../services')

function login(req, res) {
    usuario.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send({ msg: err })
        if (!user) return res.status(404).send({ msg: "El usurio no existe" })
        return user.comparePassword(req.body.pass, (err, isMatch) => {
            if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
            if (!isMatch) return res.status(404).send({ msg: `Error de contraseña: ${req.body.email}` })

            req.user = user
            return res.status(200).send({ msg: 'Te has logueado correctamente', token: service.createToken(user) })
        });

    }).select('_id email +pass');
}

function register(req, res) {
    const user = new usuario();
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
    register
}