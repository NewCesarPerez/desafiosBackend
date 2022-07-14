
const express = require('express')
const app = express()
const path = require('path')
const { Server: IOServer } = require('socket.io')
const fs =require('fs')
const expressServer = app.listen(8080, () => console.log('Escuchando servidor 8080'))
const io = new IOServer(expressServer)
const products =[]
const messages=[]
const mysql=require('./db/db_config_mysql')
const productClass=require('../contenedor/contenedorProd')
const productObj=new productClass(mysql,'productos')
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

async function persistirChat(){
    try{
        await fs.promises.writeFile(path.join(__dirname,'/chat'), JSON.stringify(messages))
        console.log('Chat almacenado')
    }catch(err){
        console.log('Error almacenando el chat', err)
    }

}
app.get('/', (req,res)=>{
    productObj.createProductTable()
})
app.post('/', (req,res)=>{
    const{nombre, precio, url}=req.body
    console.log(nombre)
    const productToPush={nombre:nombre, precio:precio,url:url}
    products.push(productToPush)
    productObj.insert(products)
    console.log(products)
})

io.on('connection', async socket => {
    console.log('Se conecto un usuario nuevo')
    io.emit('server:message',messages)
    socket.on('client:message',messageInfo=>{
        messages.push(messageInfo)
        persistirChat()
        io.emit('server:message',messages)
    } )
    socket.emit('server:products', products)
})


