import rutas from './routes/routes.js'
import express from "express"
import bcrypt from "bcrypt"
import os from 'os'
import cluster from 'cluster'
import ejs from 'ejs'
import ARGS from "./yargs/configuration.js"
import dotenv from 'dotenv'
dotenv.config()
import Yargs from "yargs";
const yargs = Yargs(process.argv.slice(2));

import session from "express-session"
import cookieParser from "cookie-parser";
import passport from "passport"
import passportLocal from "passport-local"

import signupStrategy from "./strategies/signupStrategy.js"
import loginStrategy from "./strategies/loginStrategy.js";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import mongoose from "mongoose";
import user from "./model/user.js";
import { getFailSignUp, getSignup, getLogIn, getHome, getFailLogin, getData, getInfo, getRandomCount } from "./routes/index.js";
import { postSignup, postLogin } from "./routes/index.js";
import { ArgumentParser } from "targs"

const conectarDB = async () => {
  try {
    const URL =process.env.MONGO_URL;
    await mongoose.connect(URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    console.log("Conexion establecida con la db");
        
    
  } catch (error) {
    console.log(error);
  }
};
const app = express();
const cpus=os.cpus()
const isCluster=ARGS.modo==="cluster"
function chechAuth(req,res,next){
  console.log(req.session.user)
    if (req.isAuthenticated()){
      return next()
    } else{
      res.json({error:true, message:"you are not log in"})
    }
    
}
function hashPassword(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}


  app.set('view engine', 'ejs');
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      rolling: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
    })
  );
  conectarDB()
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use("register",signupStrategy)
  passport.use("login", loginStrategy)
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    user.findById(id,done)
  });
  app.use(express.static(path.join(__dirname, "../public")));
  // app.get('/', rutas)
  app.get('/',(req,res)=>{
    if(req.isAuthenticated()){
      res.redirect('/home')
    }else{
      res.redirect('/login')
    }
  })
  app.get('/home', chechAuth, (req,res)=>{
    
    let user=req.session.user
    console.log(user.firstName)
    res.render('main.ejs', {name:user.firstName})
  })
  app.get("/login", getLogIn);
  app.post(
    "/login",
    passport.authenticate("login", {failureRedirect: "/faillogin" }),
    postLogin
  );
  
  
  app.get("/signup", getSignup);
  
  app.post("/signup", passport.authenticate('register', {failureRedirect:'/failsignup'}), postSignup);
  app.get("/failsignup", getFailSignUp)
  app.get("/faillogin", getFailLogin)
  app.get('/datos', chechAuth,(req,res)=>{
      res.json(req.session.user)
  })
  app.get('/data',getData)
  app.get('/info', getInfo)
  app.get('/logout', (req,res)=>{
    req.logout((err)=> {
      if (err) { return res.json({error:true,message:err}); }
      res.redirect('/');
    });
   
  })
  
  
  app.listen(ARGS.puerto, (req, res) => {
    console.log(`Server 4 - Escuchando puerto ${ARGS.puerto}`); 
  });




