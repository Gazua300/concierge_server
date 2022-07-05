const con = require('../connection/connection')



const delCardapio = async(req, res)=>{
    var statusCode = 400
    try{

        const [cardapio] = await con('concierge_cardapio').where({
            id: req.params.id
        })

        if(!cardapio){
            statusCode = 404
            throw new Error('Produto não encontrado')
        }


        await con('concierge_cardapio').del().where({
            id: req.params.id
        })


        res.status(200).send(`${cardapio.nome} foi removido`)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = delCardapio