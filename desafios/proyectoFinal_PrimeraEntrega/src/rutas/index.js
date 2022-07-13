const {Router}=require('express')
const router=Router()
const {getProducts, postProducts, getProductsById, updateProductsById,deleteProductById, isAdmin}=require('../controllers/productController')
const {postCarrito, deleteCarritoById, getCarrito, deleteProductById}=require('../controllers/carritoController')
router.get('/',(req,res)=>{
    res.send('Primer entrega - Proyecto final')
})

//router products
router.get('/api/productos',getProducts)
router.get('/api/productos/:id',getProductsById)
router.post('/api/productos',isAdmin,postProducts)
router.put('/api/productos/:id',isAdmin,updateProductsById)
router.delete('/api/productos',isAdmin,deleteProductById)

//router carrito
router.get('/api/carrito/:id',getCarrito)
router.post('/api/carrito',postCarrito)
router.delete('/api/carrito/:id',deleteCarritoById)
router.delete('/api/carrito/:id/productos/:id_prod',deleteProductById)


module.exports=router