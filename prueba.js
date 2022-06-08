const express=require('express')
const app=express()
const puerto=8080

app.get('/', (req,res)=>{
    res.send({nombre:'cesar'})
})

app.get('/publicaciones', (req,res)=>{
    res.status(200).send('Hola soy ruta publicaciones')
})
app.get('/user/:nombre', (req,res)=>{
    const nombre=req.params.nombre
    res.send(`Hola Soy ${nombre}`)
})
app.listen(puerto, ()=>{
    console.log(`Escuchando en el puerto ${puerto}`)

})