const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const insertClients = async(req, res)=>{
    var statusCode = 400
    try{

        const token = req.headers.authorization
        const tokenData = new Authentication().tokenData(token)
        const { nome, mesa } = req.body

        if(!token){
            statusCode = 401
            throw new Error('Token inválido, expirado ou ausente!')
        }
        
        
        if(!mesa){
            statusCode = 401
            throw new Error('Preencha os campos obrigatórios')
        }


        const id = new Authentication().idGenerator()
        const tokenClient = new Authentication().token(id)        

        
        await con(`concierge_clientes`).insert({
            id,
            nome,
            mesa,
            estabelecimento: tokenData.payload
        })
                

        res.status(200).send(tokenClient)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = insertClients