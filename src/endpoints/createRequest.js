const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const createRequest = async(req, res)=>{
    var statusCode = 400
    try{

        const id = new Authentication().idGenerator()
        const { user, mesa, quantidade } = req.body
        const [pedido] = await con('concierge_cardapio').where({
            id: req.params.id
        })

        if(!pedido){
            statusCode = 404
            throw new Error('Produto não encontrado')
        }
        

        if(!mesa || !quantidade){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const [cliente] = await con('concierge_usuarios').where({
            id: user
        })

        if(!cliente){
            statusCode = 404
            throw new Error('Cliente não encontrado')
        }


        const [estabelecimento] = await con('concierge').where({
            id: pedido.estabelecimento
        })

        if(!estabelecimento){
            statusCode = 404
            throw new Error('Estabelecimento não encontrado')
        }

        
        if(mesa > estabelecimento.mesas){
            statusCode = 403
            throw new Error(`Desculpe, mas não há mesa ${mesa} em nosso estabelecimento`)
        }


        const [ocupada] = await con('concierge_pedidos').where({
            mesa
        })

        if(ocupada){
            if(ocupada.cliente !== user && ocupada.estabelecimento === estabelecimento.id){
                statusCode = 403
                throw new Error(`Desculpe mas a mesa ${mesa} já está ocupada`)
            }
        }       
        
        
                                
        await con('concierge_pedidos').insert({
            id,
            pedido: pedido.nome,
            quantidade,
            ordem: new Date(),
            cliente: user,
            estabelecimento: estabelecimento.id,
            clienteNome: cliente.nome,
            estabelecimentoNome: estabelecimento.nome,
            mesa,
            total: pedido.preco * quantidade,
            preco: pedido.preco
        })

                
        res.status(200).end(`Seu pedido de ${pedido.nome} foi realizado`)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = createRequest