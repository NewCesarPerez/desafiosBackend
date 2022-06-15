const express=require('express')
const app=express()
const rutas=require('./rutas/index')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/public',express.static(__dirname+'/public'))
app.use('/', rutas)


app.listen(8090,(err)=>{
    if(err) console.log(`Hubo un error ${err}`)
    else console.log('Escuchando puerto 8090')})