const express = require('express')
const cors = require('cors')
const Authentication = require('./services/Authentication')
const getAllUsers = require('./endpoints/getAllUsers')
const createClient = require('./endpoints/createClient')
const getClientById = require('./endpoints/getClientById')
const getClientByEmaail = require('./endpoints/getClientByEmail')
const insertClients = require('./endpoints/insertClients')
const login = require('./endpoints/login')
const createUser = require('./endpoints/createUser')
const loginUser = require('./endpoints/loginUser')
const createRequest = require('./endpoints/createRequest')



const app = express()
app.use(express.json())
app.use(cors())


app.get('/clients', getAllUsers)
app.get('/client/:id', getClientById)
app.post('/client', createClient)
app.post('/client/email', getClientByEmaail)
app.post('/user/client', insertClients)
app.post('/client/login', login)
app.post('/user', createUser)
app.post('/user/login', loginUser)
app.post('/user/request', createRequest)


// const id = new Authentication().idGenerator()
// console.log('Id:', id)
// const hash = new Authentication().hash('senha')
// console.log('CriptoSenha:', hash)
// const compare = new Authentication().compare('senha', hash)
// console.log(compare)
// const token = new Authentication().token(id)
// console.log('Token:', token)
// const tokenData = new Authentication().tokenData(token)
// console.log('Token data:', tokenData)



app.listen(process.env.PORT || 3003, ()=>{
    console.log('Server running at http://localhost:3003')
})