const con = require('../connection/connection')



const delUser = async(req, res)=>{
    var statusCode = 400
    try{

        const [usuario] = await con('concierge_usuarios').where({
            id: req.params.id
        })

        if(!usuario){
            statusCode = 404
            throw new Error('Usuário não encontrado')
        }


        await con('concierge_usuarios').del().where({
            id: req.params.id
        })

        await con('concierge_pedidos').del().where({
            cliente: req.params.id
        })


        res.status(200).send('Conta excluida com sucesso')
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = delUser