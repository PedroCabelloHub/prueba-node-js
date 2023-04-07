const debug = require('debug')('app:module-users-controller')
const {UsersService} = require('./services')
const {Response} = require('../common/response')
const createError = require('http-errors')

module.exports.UsersController = {
    getUsers : async (req,res) => {
        try {
            let users = await UsersService.getAll()
            Response.succes(res,200,'Lista de usuarios',users)
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },
    getUser : async (req,res) => {
        try{
            const { params: { id } } = req
            let user = await UsersService.getById(id)
            if(!user){
                Response.error(res, new createError.NotFound)
            }else{
                Response.succes(res,200,'Usuario',user)
            }
        }catch(error){
            debug(error)
            Response.error(res)
        }
    },
    createUser : async (req, res) => {
        try {
            const {body} = req
            if(!body || Object.keys(body).length ===0){
                Response.error(res, new createError.BadRequest)
            }else{
                const insertedId = await UsersService.create(body)
                Response.succes(res,201,'Usuario agregado',insertedId)
            }
        } catch (error) {
            debug(error)  
            Response.error(res)
        }
    }
}