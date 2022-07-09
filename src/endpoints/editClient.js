const con = require('../connection/connection')



const editClient = async(req, res)=>{
    var statusCode = 400
    try{

        const { nome, email, endereco, servico, responsavel, mesas, contato} = req.body

        if(!nome || !email || !endereco || !servico || !responsavel || !mesas || !contato){
            statusCode = 401
            throw new Error('Preencha os campos')
        }

        const arr = String(contato).split('')
        
        if(arr.length !== 10){
            statusCode = 401
            throw new Error('Número de telelfone inválido!')
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
            mesas,
            endereco,
            contato
        }).where({
            id: req.params.id
        })
        

        res.status(200).send('Cadastro atualizado com sucesso!')
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = editClient