const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const loginUser = async(req, res)=>{
    var statusCode = 400
    try{

        const { email, senha } = req.body

        if(!email || !senha){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const [usuario] = await con('concierge_usuarios').where({
            email
        })

        if(!usuario){
            statusCode = 404
            throw new Error('Usuário não encontrado')
        }


        const compare = new Authentication().compare(senha, usuario.senha)

        if(!compare){
            statusCode = 403
            throw new Error('Senha incorreta')
        }


        res.status(200).send(usuario.id)        
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = loginUser