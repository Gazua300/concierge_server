const con = require('../connection/connection')



const editClient = async(req, res)=>{
    var statusCode = 400
    try{

        const { nome, email, servico, responsavel, mesas} = req.body

        if(!nome || !email || !servico || !responsavel || !mesas){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const [cliente] = await con('concierge').where({
            id: req.params.id
        })

        if(!cliente){
            statusCode = 404
            throw new Error('Cliente não encontrado')
        }


        await con('concierge').update({
            nome,
            email,
            servico,
            responsavel,
            mesas
        }).where({
            id: req.params.id
        })
        

        res.status(200).send('Cadastro atualizado com sucesso!')
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = editClient