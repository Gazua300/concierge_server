const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const insertClients = async(req, res)=>{
    var statusCode = 400
    try{

        
        const id = new Authentication().idGenerator()
        const { user } = req.body
    


        const [usuario] = await con('concierge_usuarios').where({
            id: user
        })

        if(!usuario){
            statusCode = 404
            throw new Error('Usuário não encontrado')
        }


        const [estabelecimento] = await con('concierge').where({
            id: req.params.id
        })

        if(!estabelecimento){
            statusCode = 404
            throw new Error('Estabelecimento inexistente no sistema')
        }


        
        await con(`concierge_clientes`).insert({
            id,
            nome: usuario.nome,
            estabelecimento: req.params.id,
            user
        })
                

        res.status(200).send(id)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = insertClients