import { Router } from "express";
import passport from "passport";
import compression from "compression";
import methodOverride from "method-override";

const router = Router();
import {
  getProducts,
  postProducts,
  getProductsById,
  getCargarProductosView,
  getProductsView,
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
import {
  getFailLogin,
  getSignup,
  getLogIn,
  getLogout,
  getFailSignUp,
  postLogin,
  postSignup,
} from "../controllers/loginController.js";
import {
  getInfo,
  getData,
  getHome,
  redirectFromRoot,
} from "../controllers/otherRoutesController.js";
import isAdmin from "../middlewares/isAdmin.js";

function checkAuth(req, res, next) {
  console.log(req.session.user);
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.json({ error: true, message: "you are not log in" });
  }
}
router.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));
//other endpoints
router.get("/", redirectFromRoot);
router.get("/info", getInfo);
router.get("/info-compress", compression(), getInfo);
router.get("/home", getHome);
router.get("/datos", checkAuth, (req, res) => {
  res.json(req.session.user);
});
router.get("/data", getData);

//router products
router.get("/api/productos", getProducts);
router.get("/productos", getProductsView)
router.get("/api/productos/:id", getProductsById);
router.get("/cargarproductos",isAdmin,getCargarProductosView);
router.post("/api/cargarproductos", isAdmin, postProducts);
router.put("/api/productos/:id", isAdmin, updateProductsById);
router.delete("/api/borrarproductos/:id", isAdmin, deleteProductById);

//router carrito
router.get("/api/carrito/:id", getCarrito);
router.post("/api/carrito", postCarrito);
router.post("/api/carrito/:id/productos/:id_prod", postProductInCartById);
router.delete("/api/carrito/:id", deleteCarritoById);
router.delete("/api/carrito/:id/productos/:id_prod", deleteProductFromCartById);

//router Login
router.get("/login", getLogIn);
router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  postLogin
);
router.get("/signup", getSignup);

router.post(
  "/signup",
  passport.authenticate("register", { failureRedirect: "/failsignup" }),
  postSignup
);
router.get("/failsignup", getFailSignUp);
router.get("/faillogin", getFailLogin);

router.get("/logout", getLogout);

export default router;
