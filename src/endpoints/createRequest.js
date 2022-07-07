const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const createRequest = async(req, res)=>{
    var statusCode = 400
    try{

        const id = new Authentication().idGenerator()
        const { pedido, user, mesa } = req.body
        

        if(!pedido || !mesa){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const [cliente] = await con('concierge_usuarios').where({
            id: user
        })

        if(!cliente){
            statusCode = 404
            throw new Error('Desculpe, você não é um usuário cadastrado no aplicativo')
        }


        const [estabelecimento] = await con('concierge').where({
            id: req.params.id
        })

        if(!estabelecimento){
            statusCode = 404
            throw new Error('Desculpe, mas seu estabelecimento ainda não é cadastrado no aplicativo')
        }

        
        if(mesa > estabelecimento.mesas){
            statusCode = 403
            throw new Error(`Desculpe, mas não há mesa ${mesa} em nosso estabelecimento`)
        }


        const [ocupada] = await con('concierge_pedidos').where({
            mesa
        })

        if(ocupada){
            if(ocupada.cliente !== user){
                statusCode = 403
                throw new Error(`Desculpe mas a mesa ${mesa} já está ocupada`)
            }
        }       
        
        
                                
        await con('concierge_pedidos').insert({
            id,
            pedido,
            ordem: new Date(),
            cliente: user,
            estabelecimento: req.params.id,
            clienteNome: cliente.nome,
            estabelecimentoNome: estabelecimento.nome,
            mesa 
        })

                
        res.status(200).end(`Seu pedido de ${pedido} foi realizado`)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = createRequest