const express=require('express')
const app=express()
const rutas=require('./rutas/index')
const path=require('path')

const {engine}=require('express-handlebars')

//Configuración hadlebars

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('hbs', engine({
    extname:'.hbs',
    defaultLayout:path.join(__dirname,'./views/layouts/main.hbs'),
    layoutsDir:path.join(__dirname, './views/layouts'),
    partialsDir:path.join(__dirname, './views/partials')
}))
app.set('views', './views')
app.set('view engine', 'hbs')


app.use('/', rutas)

app.listen(8090,(err)=>{
    if(err)console.log('Hubo un error')
    else console.log('Escuchando puerto 8090')
})