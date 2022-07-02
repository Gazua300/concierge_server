const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const createRequest = async(req, res)=>{
    var statusCode = 400
    try{

        const token = req.headers.authorization
        const tokenData = new Authentication().tokenData(token)
        const id = new Authentication().idGenerator()
        const { pedido } = req.body

        if(!token){
            statusCode = 401
            throw new Error('Token inválido, expirado ou ausente!')
        }

        if(!pedido){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const [cliente] = await con('concierge_clientes').where({
            id: tokenData.payload
        })
        
        if(!cliente){
            statusCode = 404
            throw new Error('Cliente não encontrado')
        }

                        
        await con('concierge_pedidos').insert({
            id,
            mesa: cliente.mesa,
            pedido,
            ordem: new Date().toLocaleTimeString(),
            cliente: cliente.id
        })
        
        
        res.status(200).end(`${pedido} para mesa ${cliente.mesa}`)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = createRequest