const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const login = async(req, res)=>{
    var statusCode = 400
    try{

        const { email, senha } = req.body

        if(!email || !senha){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const [user] = await con('concierge').where({
            email
        })
        
        if(!user){
            statusCode = 404
            throw new Error('Usuário não encontrado')
        }


        const compare = new Authentication().compare(senha, user.senha)
        

        if(!compare){
            statusCode = 404
            throw new Error('Senha incorreta')
        }


        res.status(200).send(user.id)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = login