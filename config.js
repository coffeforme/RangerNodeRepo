'use strict'

module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB || "mongodb://admin:clave123@dbtest-shard-00-00-46sbq.mongodb.net:27017,dbtest-shard-00-01-46sbq.mongodb.net:27017,dbtest-shard-00-02-46sbq.mongodb.net:27017/productosbd?ssl=true&replicaSet=DBTest-shard-0&authSource=admin&retryWrites=true",
    SECRET_TOKEN: 'RHCP'
}