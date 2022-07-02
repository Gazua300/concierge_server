const con = require('../connection/connection')


const getAllUsers = async(req, res)=>{
    var statusCode = 400
    try{

        
        const users = await con('concierge')


        res.status(200).send(users)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}


module.exports = getAllUsers