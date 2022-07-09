const con = require('../connection/connection')
const nodemailer = require('nodemailer')
const { config } = require('dotenv')


config()


const keyRescue = async(req, res)=>{
    var statusCode = 400
    try{

        const [email] = await con('concierge').where({
            id: req.params.id
        })

        if(!email){
            statusCode = 404
            throw new Error('Cliente não encontrado')
        }

        const hideMail = `***${email.email.substring(6)}`

        
        const transport = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            port: process.env.NODEMAILER_PORT,
            auth: {
              user: process.env.NODEMAILER_USER,
              pass: process.env.NODEMAILER_PASS
            }
          });

        await transport.sendMail({
            from: 'botofmine@gmail.com',
            to: email.email,
            subject: "testando nodemailer",
            text: "Exmplo",
            html: "<a href='https://facebook.com'>Redefinier senha</a>"
        })


        res.status(200).send(`Verifique a caixa de entrada de ${hideMail}`)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = keyRescue