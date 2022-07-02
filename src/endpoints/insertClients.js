const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const insertClients = async(req, res)=>{
    var statusCode = 400
    try{

        const { nome, mesa } = req.body
        
        
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
            estabelecimento: req.params.id
        })
                

        res.status(200).send(tokenClient)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = insertClients