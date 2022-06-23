const router = require("../rutas")

const arrayProductos=[]

const getProducts=(req,res)=>{
    res.render('contenedor.pug',{productos:arrayProductos})
}

const postProducts=(req,res)=>{
    const{nombre, precio, url}=req.body
    const productToPush={nombre:nombre, precio:precio,url:url}
    if(!arrayProductos.length){
        productToPush.id=1
        console.log('primer console ' +productToPush.id)
    }
    else {
        productToPush.id=arrayProductos[arrayProductos.length-1].id+1
        console.log('console del id del array '+arrayProductos[arrayProductos.length-1].id)
        console.log('seg console ' +productToPush.id)}
    arrayProductos.push(productToPush)
    res.redirect('/productos')
}


module.exports={
    getProducts,
    postProducts
}