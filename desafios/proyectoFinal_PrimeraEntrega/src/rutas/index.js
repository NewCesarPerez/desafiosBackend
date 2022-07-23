const {Router}=require('express')
const router=Router()
const {getProducts, postProducts, getProductsById, updateProductsById,deleteProductById, isAdmin}=require('../controllers/productController')
const {postCarrito,postProductInCartById, deleteCarritoById, getCarrito, deleteProductFromCartById}=require('../controllers/carritoController')
const isAdmin = require('../middlewares/isAdmin');
router.get('/',(req,res)=>{
    res.send('Primer entrega - Proyecto final')
})

//router products
router.get('/api/productos',getProducts)
router.get('/api/productos/:id',getProductsById)
router.post('/api/productos',isAdmin,postProducts)
router.put('/api/productos/:id',isAdmin,updateProductsById)
router.delete('/api/productos/:id',isAdmin,deleteProductById)

//router carrito
router.get('/api/carrito/:id',getCarrito)
router.post('/api/carrito',postCarrito)
router.post('/api/carrito/:id/productos/:id_prod', postProductInCartById)
router.delete('/api/carrito/:id',deleteCarritoById)
router.delete('/api/carrito/:id/productos/:id_prod',deleteProductFromCartById)


module.exports=router