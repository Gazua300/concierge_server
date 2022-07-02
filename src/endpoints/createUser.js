const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const createUser = async(req, res)=>{
    var statusCode = 400
    try{

        const { nome, email, senha } = req.body

        if(!nome || !email || !senha){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const [usuario] = await con('concierge_usuarios').where({
            email
        })

        if(usuario){
            statusCode = 403
            throw new Error('Usuário já cadastrado')
        }


        const id = new Authentication().idGenerator()
        const token = new Authentication().token(id)
        const hash = new Authentication().hash(senha)


        await con('concierge_usuarios').insert({
            id,
            nome,
            email,
            senha: hash
        })


        res.status(200).send(token)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = createUser