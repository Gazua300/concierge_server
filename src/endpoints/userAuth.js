const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const userAuth = async(req, res)=>{
    var statusCode = 400
    try{

        const { senha } = req.body


        const [usuario] = await con('concierge_usuarios').where({
            id: req.params.id
        })

        if(!usuario){
            statusCode = 404
            throw new Error('Usuário não encontrado')
        }

        const compare = new Authentication().compare(senha, usuario.senha)
        

        if(!compare){
            statusCode = 403
            throw new Error('Senha incorreta!')
        }


        res.status(200).send('Verificação confirmada')
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = userAuth