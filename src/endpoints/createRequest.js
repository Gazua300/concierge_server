const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const createRequest = async(req, res)=>{
    var statusCode = 400
    try{

        const token = req.headers.authorization
        const tokenData = new Authentication().tokenData(token)
        const { pedido } = req.body

        if(!token){
            statusCode = 401
            throw new Error('Token inválido, expirado ou ausente!')
        }

        if(!pedido){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const [numero] = await con('concierge_pedidos').count('ordem').where({
            id: tokenData.payload
        })

        console.log(Number(Object.values(numero)))
        

        
        res.status(200).end()
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = createRequest