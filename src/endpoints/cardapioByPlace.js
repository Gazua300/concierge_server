const con = require('../connection/connection')



const cardapioByPlace = async(req, res)=>{
    var statusCode = 400
    try{

        const cardapio = await con('concierge_cardapio').where({
            estabelecimento: req.params.id
        })

        if(!cardapio){
            statusCode = 404
            throw new Error('Estabelecimento não encontrado')
        }

        
        res.status(200).send(cardapio)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = cardapioByPlace