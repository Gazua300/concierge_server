const con = require('../connection/connection')



const cardapioById = async(req, res)=>{
    var statusCode = 400
    try{

        const [cardapio] = await con('concierge_cardapio').where({
            id: req.params.id
        })

        if(!cardapio){
            statusCode = 404
            throw new Error('Item não encontrado')
        }
        

        res.status(200).send(cardapio)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = cardapioById