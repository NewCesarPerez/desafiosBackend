
const express = require('express')
const app = express()
const path = require('path')
const { Server: IOServer } = require('socket.io')
const fs =require('fs')
const expressServer = app.listen(8080, () => console.log('Escuchando servidor 8080'))
const io = new IOServer(expressServer)
const products = [{ title: 'lapiz', thumbnail: 'https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/edit-change-pencil-256.png', price: 125, id:1 }]
const messages=[]
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

app.post('/', (req,res)=>{
    const{nombre, precio, url}=req.body
    console.log(nombre)
    const productToPush={title:nombre, price:precio,thumbnail:url}
    if(!products.length){
        productToPush.id=1
        console.log('primer console ' +productToPush.id)
    }
    else {
    productToPush.id=products[products.length-1].id+1
    
    console.log('console del id del array '+products[products.length-1].id)
    console.log('seg console ' +productToPush.id)}
    products.push(productToPush)
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


