'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, { useNewUrlParser: true }, (err, res) => {
    if (err) {
        return console.log(`Error al conectar a mongo: ${err}`);
    }
    console.log("Conectado a mongo, prueba remota")
    app.listen(config.port, () => {
        console.log(`http://localhost:${config.port}`)
    })
})
