import { json } from "express";
import {CarritoDao} from "../daos/index.js";

export const postCarrito = async (req, res) => {
  try {
    const cart = req.body;
    const cartId = await CarritoDao.create(cart);
    res.status(201).json(cartId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

export const postProductInCartById = async (req, res) => {
  const idProductToCompare = Number(req.params.id_prod);
  const cartIdToUse = Number(req.params.id);
  if (idProductToCompare && cartIdToUse) {
    const productById = await ProductoDao.readById(idProductToCompare);
    const cartById = await CarritoDao.readById(cartIdToUse);
    const cart = await CarritoDao.readAll();
    const index = cart.findIndex((element) => element.id === cartById.id);
    cartById.productos.push(productById);
    await CarritoDao.update(cartById.id, cartById);
  } else {
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};
export const getCarrito = async (req, res) => {
  try {
    const idToCompare = Number(req.params.id);
    const carritoToRender = await CarritoDao.readById(idToCompare);
    if (!carritoToRender)
      res.status(500).json({ error: "Carrito no encontrado" });
    else {
      res.json(carritoToRender.productos);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Hubo un error" });
  }
};

export const deleteCarritoById = async (req, res) => {
  try {
    const idToCompare = Number(req.params.id);
    await CarritoDao.deleteById(idToCompare);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

export const deleteProductFromCartById = async (req, res) => {
  const cartIdToUse = Number(req.params.id);
  const idProductToCompare = Number(req.params.id_prod);
  if (idProductToCompare && cartIdToUse) {
    const cartById = await CarritoDao.readById(cartIdToUse);
    cartById.productos = cartById.productos.filter((prod) => {
      prod.id !== idProductToCompare;
    });
    await CarritoDao.update(cartById.id, cartById);
  } else {
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

// export default {
//   postCarrito,
//   postProductInCartById,
//   getCarrito,
//   deleteProductFromCartById,
//   deleteCarritoById,
// };
