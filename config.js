'use strict'

module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB || "mongodb://admin:clave123@ranger-shard-00-00-46sbq.mongodb.net:27017,ranger-shard-00-01-46sbq.mongodb.net:27017,ranger-shard-00-02-46sbq.mongodb.net:27017/test?ssl=true&replicaSet=Ranger-shard-0&authSource=admin&retryWrites=true",
    SECRET_TOKEN: 'RHCP'
}