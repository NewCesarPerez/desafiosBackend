import { Router } from "express";
import {
  getFailSignUp,
  getSignup,
  getLogIn,
  getHome,
  getFailLogin,
  getInfo,
  getData,
  redirectFromRoot,
  getLogout,
} from "./index.js";
import { postSignup, postLogin } from "./index.js";
import passport from "passport";
import compression from "compression";
const router = Router();

function chechAuth(req, res, next) {
  console.log(req.session.user);
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.json({ error: true, message: "you are not log in" });
  }
}

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/home");
  } else {
    res.redirect("/login");
  }
});
router.get("/info", getInfo);
router.get("/info-compress",compression(), getInfo);
router.get("/home", getHome);
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
router.get('/datos', chechAuth,(req,res)=>{
  res.json(req.session.user)
})
router.get('/data',getData)
router.get('/logout',getLogout)


export default router;
