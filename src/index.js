const express = require('express')
const cors = require('cors')
const getAllUsers = require('./endpoints/getAllUsers')
const createClient = require('./endpoints/createClient')
const getClientById = require('./endpoints/getClientById')
const getClientByEmaail = require('./endpoints/getClientByEmail')
const insertClients = require('./endpoints/insertClients')
const login = require('./endpoints/login')
const createUser = require('./endpoints/createUser')
const loginUser = require('./endpoints/loginUser')
const createRequest = require('./endpoints/createRequest')
const requestsByClient = require('./endpoints/requestsByClient')



const app = express()
app.use(express.json())
app.use(cors())


app.get('/clients', getAllUsers)
app.get('/client/:id', getClientById)
app.get('/client/requests/:id', requestsByClient)
app.post('/client', createClient)
app.post('/client/email', getClientByEmaail)
app.post('/user/client', insertClients)
app.post('/client/login', login)
app.post('/user', createUser)
app.post('/user/login', loginUser)
app.post('/user/request', createRequest)





app.listen(process.env.PORT || 3003, ()=>{
    console.log('Server running at http://localhost:3003')
})