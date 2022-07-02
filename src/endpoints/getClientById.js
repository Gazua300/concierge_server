const con = require('../connection/connection')



const getClientById = async(req, res)=>{
    var statusCode = 400
    try{
        
        const [client] = await con('concierge').where({
            id: req.params.id
        })

        if(!client){
            statusCode = 404
            throw new Error('Cliente não encontrado')
        }


        res.status(200).send(client)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = getClientById