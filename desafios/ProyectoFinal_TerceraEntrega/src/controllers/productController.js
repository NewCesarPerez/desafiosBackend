import {ProductoDao} from '../daos/index.js'
import path from "path";
import { fileURLToPath } from "url";
import { loggerConsola } from '../loggerConfig.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const getProducts = async (req, res) => {
    try{
     
        const productos= await ProductoDao.readAll()
        res.json(productos)
    }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Ha ocurrido un error' })
    }
  
};

export const getProductsView= async (req, res) => {
  try{
    const productos= await ProductoDao.readAll()
    res.render('productos.ejs', {productos:productos, hasAny:productos.length})
  }catch(error){
      console.log(error)
      res.status(500).json({ message: 'Ha ocurrido un error' })
  }
}

export const getCargarProductosView = async (req, res) => {
  try{
    const productos= await ProductoDao.readAll()   
    res.render('uploadProduct.ejs', {productos:productos, hasAny:productos.length})
  }catch(error){
      console.log(error)
      res.status(500).json({ message: 'Ha ocurrido un error' })
  }

};

export const getProductsById=async (req, res)=>{
    try{
        const idToCompare=req.params.id
        const productToRender=await ProductoDao.readById(idToCompare)
        if(!productToRender)res.json({error:'Producto no encontrado'})
        else res.json(productToRender)
    }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Ha ocurrido un error' })
    }
}

export const postProducts = async (req, res) => {
  try{
    const products = req.body;
    const newProduct = await ProductoDao.create(products)
    loggerConsola.info(newProduct)
    res.redirect('/cargarproductos')
    }catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Ha ocurrido un error' })
    }
};

export const updateProductsById=async (req, res)=>{
    try{
    const productId=req.params.id
    const product=req.body
    await ProductoDao.update(productId,product)
    res.sendStatus(201)
    }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Ha ocurrido un error' })
    }
}

export const deleteProductById=async(req,res)=>{
    try{
        const idToCompare=req.params.id
        const respuesta=await ProductoDao.deleteById(idToCompare)
        res.json({message: 'Producto eliminado'})
    }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Ha ocurrido un error' })  
    }
}

// export default {
//   getProducts,
//   postProducts,
//   getProductsById,
//   updateProductsById,
//   deleteProductById,
// };
