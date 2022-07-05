const con = require('../connection/connection')



const editUser = async(req, res)=>{
    var statusCode = 400
    try{

        const { nome, email } = req.body

        if(!nome || !email ){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const [usuario] = await con('concierge_usuarios').where({
            id: req.params.id
        })

        if(!usuario){
            statusCode = 404
            throw new Error('Usuário não encontrado')
        }


        await con('concierge_usuarios').update({
            nome,
            email
        }).where({
            id: req.params.id
        })
        

        res.status(200).send('Cadastro atualizado com sucesso!')
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = editUser