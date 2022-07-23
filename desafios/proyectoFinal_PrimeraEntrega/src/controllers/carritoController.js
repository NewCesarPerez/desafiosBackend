const { json } = require("express");
const Contenedor = require("../contenedores/contenedor");
const cartContainer = new Contenedor("productos.txt");
const productContainer = new Contenedor("productos.txt");

const postCarrito = async (req, res) => {
  const cart = await cartContainer.save({ productos: [] });
  res.status(201).json(cart.Id);
};

const postProductInCartById = async (req, res) => {
  const idProductToCompare = Number(req.params.id_prod);
  const cartIdToUse = Number(req.params.id);
  if (idProductToCompare && cartIdToUse) {
    const productById = await productContainer.getById(idProductToCompare);
    const cartById = await cartContainer.getById(cartIdToUse);
    const cart = await cartContainer.getAll();
    const index = cart.findIndex((element) => element.id === cartById.id);
    cartById.productos.push(productById);
    await cartContainer.update(cartById);
  } else {
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};
const getCarrito = async (req, res) => {
  try {
    const idToCompare = Number(req.params.id);
    const carritoToRender = cartContainer.getbyId(idToCompare);
    if (!carritoToRender) res.status(500).json({ error: "Carrito no encontrado" });
    else {
      res.json(carritoToRender.productos);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Hubo un error" });
  }
};

const deleteCarritoById = (req, res) => {
  try{
    const idToCompare=Number(req.params.id)
    await cartContainer.deleteById(idToCompare)
    }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Ha ocurrido un error' })  
    }
};

const deleteProductFromCartById = (req, res) => {
  const cartIdToUse = Number(req.params.id);
  const idProductToCompare = Number(req.params.id_prod);
  if (idProductToCompare && cartIdToUse) {
    const cartById = await cartContainer.getById(cartIdToUse);
    cartById.productos=cartById.productos.filter(prod=>{
        prod.id!==idProductToCompare
    })
    await cartContainer.update(cartById);
  } else {
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

module.exports = {
  postCarrito,
  postProductInCartById,
  deleteCarritoById,
  getCarrito,
  deleteProductFromCartById,
};
