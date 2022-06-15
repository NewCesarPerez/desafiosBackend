//const Contenedor=require('../clases/Contenedor.js')
//const productos=new Contenedor()
const {Router}=require('express')
const router=Router()
let arrayProductos=[{title:"Smart TV NanoCell LG", price:159000, thumbnail:'./imagenes/nanocell.jpg', id:1},{title:"Smart TV OLED LG", price:159000, thumbnail:'./imagenes/oled.jpg',id:2},{title:"Smart TV UHD LG", price:159000, thumbnail:'./imagenes/uhd.jpg', id:3}]
router.get('/',(req,res)=>{
res.send('Desafio cuatro routes nuevo archivo')
})

router.get('/api/productos',(req,res)=>{
res.json(arrayProductos)
})
router.get('/api/productos/:id',(req,res)=>{
const idToCompare=Number(req.params.id)
const productToRender=arrayProductos.find(prod=>prod.id===idToCompare)
if(!productToRender)res.json({error:'Producto no encontrado'})
else res.json(productToRender)
})
router.post('/api/productos',(req,res)=>{
    const{title, price, thumbnail}=req.body
    const productToPush={titile:title, price:price,thumbnail:thumbnail}
    productToPush.id=arrayProductos[arrayProductos.length-1].id+1
    arrayProductos.push(productToPush)
    res.status(201).json(productToPush)

})
router.put('/api/productos/:id',(req,res)=>{
    const{title,price,thumbnail}=req.body
    const idToCompare=Number(req.params.id)
    const productToModify=arrayProductos.find(prod=>prod.id===idToCompare)
    if(!productToModify)res.json({error:'Producto no encontrado'})
    else {
        const Index = arrayProductos.findIndex((prod) => prod.id === idToCompare)
            arrayProductos[Index].title=title
            arrayProductos[Index].price=price
            arrayProductos[Index].thumbnail=thumbnail
        res.status(200).json('Producto actualizado')
    }
})
router.delete('/api/productos/:id',(req,res)=>{
    const idToCompare=Number(req.params.id)
    const productToErase=arrayProductos.find(prod=>prod.id===idToCompare)
    if(!productToErase)res.json({error:'Producto no encontrado'})
    else {
        arrayProductos=arrayProductos.filter(prod=>prod.id!==idToCompare)
        res.json('Producto eliminado')
    }
})
module.exports=router