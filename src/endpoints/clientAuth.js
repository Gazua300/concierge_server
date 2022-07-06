const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const clientAuth = async(req, res)=>{
    var statusCode = 400
    try{

        const { senha } = req.body

        if(!senha){
            statusCode = 401
            throw new Error('Você precisa digitar sua senha!')
        }


        const [cliente] = await con('concierge').where({
            id: req.params.id
        })

        if(!cliente){
            statusCode = 404
            throw new Error('Cliente não encontrado')
        }

        const compare = new Authentication().compare(senha, cliente.senha)
        

        if(!compare){
            statusCode = 403
            throw new Error('Senha incorreta!')
        }


        res.status(200).send('Verificação confirmada')
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = clientAuth