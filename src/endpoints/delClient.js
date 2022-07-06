const con = require('../connection/connection')



const delClient = async(req, res)=>{
    var statusCode = 400
    try{

        const [cliente] = await con('concierge').where({
            id: req.params.id
        })

        if(!cliente){
            statusCode = 404
            throw new Error('Cliente não encontrado')
        }


        await con('concierge').del().where({
            id: req.params.id
        })

        await con('concierge_cardapio').del().where({
            estabelecimento: req.params.id
        })

        await con('concierge_pedidos').del().where({
            estabelecimento: req.params.id
        })


        res.status(200).send('Conta excluida com sucesso')
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = delClient