const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const delRequest = async(req, res)=>{
    var statusCode = 400
    try{   
        
        const [request] = await con('concierge_pedidos').where({
            id: req.params.id
        })

        if(!request){
            statusCode = 404
            throw new Error('Pedido não consta')
        }


        await con('concierge_pedidos').del().where({
            id: req.params.id
        })
                

        res.status(200).send(`O pedido de ${request.pedido} foi removido`)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = delRequest