const con = require('../connection/connection')



const requestsByClient = async(req, res)=>{
    var statusCode = 400
    try{
        
        const pedidos = await con('concierge_pedidos').where({
            cliente: req.params.id
        })


        if(pedidos.length === 0){
            statusCode = 404
            throw new Error('Não há pedidos para esse cliente')
        }

        
        res.status(200).send(pedidos)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = requestsByClient