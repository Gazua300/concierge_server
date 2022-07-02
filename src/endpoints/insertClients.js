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


        const [usuario] = await con('concierge_usuarios')


        const id = new Authentication().idGenerator()       

        
        await con(`concierge_clientes`).insert({
            id,
            nome,
            mesa,
            estabelecimento: req.params.id
        })
                

        res.status(200).send(mesa)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = insertClients