//cliente que nos servirá para conectarnos al cliente de mongoatlas
const {MongoClient} = require('mongodb')
const debug = require('debug')('app:module-database')

const { Config } = require('../config/index')

var connection = null
module.exports.Database = (collection) => new Promise( async (resolve, reject) => {
    try{
        if(!connection){
            const cliente = new MongoClient(Config.mongoUri)
            connection = await cliente.connect()
            debug('Nueva Conexion realizada con MongoDB Atlas')
        }
        debug('Reutilizando conexion')
        const db = connection.db(Config.mongoDbname)
        resolve(db.collection(collection))
    }catch(error){
        reject(error)
    }
})