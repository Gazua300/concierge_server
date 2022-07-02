const con = require('../connection/connection')


const getClientByEmail = async(req, res)=>{
    var statusCode = 400
    try{

        const { email } = req.body

        if(!email){
            statusCode = 401
            throw new Error('Preencha o campo')
        }


        const [client] = await con('concierge').where({
            email
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

module.exports = getClientByEmail