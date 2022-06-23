const {Router}=require('express')
const router=Router()
const {getProducts, postProducts}=require('../../controllers/productController')
router.get('/productos',getProducts)
router.post('/productos',postProducts)
module.exports=router