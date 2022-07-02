const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const clientsByPlace = async(req, res)=>{
    var statusCode = 400
    try{

        const clients = await con('concierge_clientes').where({
            estabelecimento: req.params.id
        })

                
        res.status(200).send(clients)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = clientsByPlace