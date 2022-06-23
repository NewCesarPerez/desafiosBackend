const {Router}=require('express')
const router=Router()
const {getProducts, postProducts}=require('../controller/productController')

router.get('/',(req,res)=>{
    res.render('contenedor.pug',{nombre:'robotina', precio:19000, url:'hfhf'})
})

router.get('/productos',getProducts)
router.post('/productos',postProducts)
module.exports=router