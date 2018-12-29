'use strict'
const servicio = require('../services')

function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: "Debe volver a autenticarse" })
    }
    
    const token = req.headers.authorization
    servicio.decodeToken(token).
        then(
            response => {
                req.user = response;
                next()
            }
        ).catch(
            response => {
                res.status(response.status).send(response.message)
            }
        );
}

module.exports = isAuth
