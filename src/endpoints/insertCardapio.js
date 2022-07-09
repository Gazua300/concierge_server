const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const insertCardapio = async(req, res)=>{
    var statusCode = 400
    try{

        const id = new Authentication().idGenerator()
        const { nome, preco } = req.body

        if(!nome || !preco){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const [client] = await con('concierge').where({
            id: req.params.id
        })

        if(!client){
            statusCode = 404
            throw new Error('Estabelecimento não encontrado')
        }


        await con('concierge_cardapio').insert({
            id,
            nome,
            preco,
            estabelecimento: client.id
        })


        res.status(200).send(`${nome} registrado no sistema`)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = insertCardapio