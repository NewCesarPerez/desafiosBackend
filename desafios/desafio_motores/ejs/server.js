const express=require('express')
const app=express()
const rutas=require('./rutas/index')
const path=require('path')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('views', path.join(__dirname,'./views/layouts'))
app.set('view engine', 'ejs')


app.use('/', rutas)

app.listen(8080,(err)=>{
    if(err)console.log('Hubo un error')
    else console.log('Escuchando puerto 8080')
})