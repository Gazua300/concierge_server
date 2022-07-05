const express = require('express')
const cors = require('cors')
const getAllUsers = require('./endpoints/getAllUsers')
const getAllClients = require('./endpoints/getAllClients')
const createClient = require('./endpoints/createClient')
const getClientById = require('./endpoints/getClientById')
const getUserById = require('./endpoints/getUserById')
const login = require('./endpoints/login')
const createUser = require('./endpoints/createUser')
const loginUser = require('./endpoints/loginUser')
const createRequest = require('./endpoints/createRequest')
const requestsByClient = require('./endpoints/requestsByClient')
const clientsByPlace = require('./endpoints/clientsByPlace')
const insertCardapio = require('./endpoints/insertCardapio')
const cardapioByPlace = require('./endpoints/cardapioByPlace')
const cardapioById = require('./endpoints/cardapioById')
const delRequest = require('./endpoints/delRequest')
const delCardapio = require('./endpoints/delCardapio')
const editClient = require('./endpoints/editClient')
const editUser = require('./endpoints/editUser')




const app = express()
app.use(express.json())
app.use(cors())




app.get('/clients', getAllUsers)
app.get('/users', getAllClients)
app.get('/client/:id', getClientById)
app.get('/user/:id', getUserById)
app.get('/requests/:id', requestsByClient)
app.get('/place/:id', clientsByPlace)
app.get('/cardapio/place/:id', cardapioByPlace)
app.get('/cardapio/user/:id', cardapioById)
app.post('/client', createClient)
app.post('/user', createUser)
app.post('/client/login', login)
app.post('/user/login', loginUser)
app.post('/request/:id', createRequest)
app.post('/cardapio/:id', insertCardapio)
app.delete('/request/:id', delRequest)
app.delete('/cardapio/:id', delCardapio)
app.put('/client/:id', editClient)
app.put('/user/:id', editUser)






app.listen(process.env.PORT || 3003, ()=>{
    console.log('Server running at http://localhost:3003')
})