import { Router } from "express";
const router = Router();
import {
  getProducts,
  postProducts,
  getProductsById,
  updateProductsById,
  deleteProductById,
} from "../controllers/productController.js";
import {
  postCarrito,
  postProductInCartById,
  deleteCarritoById,
  getCarrito,
  deleteProductFromCartById,
} from "../controllers/carritoController.js";
import isAdmin from "../middlewares/isAdmin.js";
router.get("/", (req, res) => {
  res.send("Segunda entrega - Proyecto final");
});

//router products
router.get("/api/productos", getProducts);
router.get("/api/productos/:id", getProductsById);
router.post("/api/productos", isAdmin, postProducts);
router.put("/api/productos/:id", isAdmin, updateProductsById);
router.delete("/api/productos/:id", isAdmin, deleteProductById);

//router carrito
router.get("/api/carrito/:id", getCarrito);
router.post("/api/carrito", postCarrito);
router.post("/api/carrito/:id/productos/:id_prod", postProductInCartById);
router.delete("/api/carrito/:id", deleteCarritoById);
router.delete("/api/carrito/:id/productos/:id_prod", deleteProductFromCartById);

export default router;
