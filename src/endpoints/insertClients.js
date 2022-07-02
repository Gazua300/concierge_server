const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const insertClients = async(req, res)=>{
    var statusCode = 400
    try{

        const token = req.headers.authorization
        const tokenData = new Authentication().tokenData(token)
        const id = new Authentication().idGenerator()


        const [usuario] = await con('concierge_usuarios').where({
            id: tokenData.payload
        })

        if(!usuario){
            statusCode = 404
            throw new Error('Cliente não encontrado. Algo pode ter dado errado a melhor opção e sair da sua conta e relogar novamente')
        }


        
        await con(`concierge_clientes`).insert({
            id,
            nome: usuario.nome,
            estabelecimento: req.params.id
        })
                

        res.status(200).send(id)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = insertClients