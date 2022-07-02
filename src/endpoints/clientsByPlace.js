const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const clientsByPlace = async(req, res)=>{
    var statusCode = 400
    try{

        const token = req.headers.authorization
        const tokenData = new Authentication().tokenData(token)

        if(!token){
            statusCode = 401
            throw new Error('Token inválido, expirado ou ausente')
        }


        req.params.id = tokenData.payload

        const clients = await con('concierge_clientes').where({
            estabelecimento: req.params.id
        })

                
        res.status(200).send(clients)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = clientsByPlace