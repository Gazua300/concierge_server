const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const createRequest = async(req, res)=>{
    var statusCode = 400
    try{

        const id = new Authentication().idGenerator()
        const { pedido } = req.body
        

        if(!pedido){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const [cliente] = await con('concierge_clientes').where({
            id: req.params.id
        })
        
        if(!cliente){
            statusCode = 404
            throw new Error('Você ainda não é cliente')
        }

                        
        await con('concierge_pedidos').insert({
            id,
            pedido,
            ordem: new Date().toLocaleTimeString(),
            cliente: cliente.id
        })
        
        
        res.status(200).end(`Seu pedido de ${pedido} foi realizado`)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = createRequest