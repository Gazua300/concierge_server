const con = require('../connection/connection')



const clientsByPlace = async(req, res)=>{
    var statusCode = 400
    try{

        const clients = await con('concierge_pedidos').where({
            estabelecimento: req.params.id
        })


        if(clients.length === 0){
            statusCode = 404
            throw new Error('Não há pedidos para esse estabelecimento')
        }

                
        res.status(200).send(clients)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = clientsByPlace