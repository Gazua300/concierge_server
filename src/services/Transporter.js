const nodemailer = require('nodemailer')
const { config } = require('dotenv')

config()

const Transporter = async()=>{
    const transorter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
    })
}

