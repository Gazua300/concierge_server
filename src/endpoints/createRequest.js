const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const createRequest = async(req, res)=>{
    var statusCode = 400
    try{

        const id = new Authentication().idGenerator()
        const { pedido, user } = req.body
        

        if(!pedido){
            statusCode = 401
            throw new Error('Preencha os campos')
        }

                        
        await con('concierge_pedidos').insert({
            id,
            pedido,
            ordem: new Date().toLocaleTimeString(),
            cliente: user
        })
        
        
        res.status(200).end(`Seu pedido de ${pedido} foi realizado`)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = createRequest