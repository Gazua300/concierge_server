const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const createClient = async(req, res)=>{
    var statusCode = 400
    try{

        const { nome, email, senha, servico, responsavel, mesas, endereco, contato } = req.body

        if(!nome || !email || !senha || !servico || !responsavel || !mesas || !endereco || !contato){
            statusCode = 401
            throw new Error('Preencha os campos')
        }

        const arr = String(contato).split('')
        
        if(arr.length !== 10){
            statusCode = 401
            throw new Error('Número de telelfone inválido!')
        }
        
        
        const [user] = await con('concierge').where({
            email
        })
        
        if(user){
            statusCode = 403
            throw new Error('Cliente já cadastrado')
        }
        
        
        const id = new Authentication().idGenerator()
        const hash = new Authentication().hash(senha)
        
        
        await con('concierge').insert({
            id,
            nome,
            email,
            senha: hash,
            servico,
            responsavel,
            mesas,
            endereco,
            contato
        })

              
        res.status(200).send(id)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = createClient