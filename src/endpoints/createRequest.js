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


        const [cliente] = await con('concierge_usuarios').where({
            id: user
        })

        if(!cliente){
            statusCode = 404
            throw new Error('Desculpe, você não é um cliente cadastrado')
        }


        const [estabelecimento] = await con('concierge').where({
            id: req.params.id
        })

        if(!estabelecimento){
            statusCode = 404
            throw new Error('Desculpe, mas seu estabelecimento ainda não é cadastrado')
        }

                        
        await con('concierge_pedidos').insert({
            id,
            pedido,
            ordem: new Date().toLocaleTimeString(),
            cliente: user,
            estabelecimento: req.params.id,
            clienteNome: cliente.nome,
            estabelecimentoNome: estabelecimento.nome 
        })
        
        
        res.status(200).end(`Seu pedido de ${pedido} foi realizado`)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = createRequest