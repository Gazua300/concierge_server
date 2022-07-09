const express = require('express')
const cors = require('cors')

const getAllUsers = require('./endpoints/getAllUsers')
const getAllClients = require('./endpoints/getAllClients')
const getClientById = require('./endpoints/getClientById')
const getUserById = require('./endpoints/getUserById')
const requestsByClient = require('./endpoints/requestsByClient')
const clientsByPlace = require('./endpoints/clientsByPlace')
const cardapioByPlace = require('./endpoints/cardapioByPlace')
const cardapioById = require('./endpoints/cardapioById')

const createClient = require('./endpoints/createClient')
const createUser = require('./endpoints/createUser')
const login = require('./endpoints/login')
const loginUser = require('./endpoints/loginUser')
const createRequest = require('./endpoints/createRequest')
const insertCardapio = require('./endpoints/insertCardapio')
const clientAuth = require('./endpoints/clientAuth')
const userAuth = require('./endpoints/userAuth')

const delRequest = require('./endpoints/delRequest')
const delCardapio = require('./endpoints/delCardapio')
const delUser = require('./endpoints/delUser')
const delClient = require('./endpoints/delClient')

const editClient = require('./endpoints/editClient')
const editUser = require('./endpoints/editUser')
const keyRescue = require('./endpoints/keyRescue')




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
app.post('/clientauth/:id', clientAuth)
app.post('/userauth/:id', userAuth)
app.delete('/request/:id', delRequest)
app.delete('/cardapio/:id', delCardapio)
app.delete('/user/:id', delUser)
app.delete('/client/:id', delClient)
app.put('/client/:id', editClient)
app.put('/user/:id', editUser)
app.put('/rescuepassword/:id', keyRescue)






app.listen(process.env.PORT || 3003, ()=>{
    console.log('Server running at http://localhost:3003')
})