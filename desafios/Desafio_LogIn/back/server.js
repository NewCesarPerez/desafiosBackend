import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
const app = express();
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
let user;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "../front/public"));
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://newCesarPerez:Jumpforce_2022@cluster0.vc8l75y.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions,
    }),
    secret: "desafioLog",
    rolling: true,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 50000,
    },
  })
);
function authMiddleware(req,res,next){
    if(req.session.username){
        next()
    }else{
        res.redirect('/login')
    }
}
function loginMiddleware(req,res,next) {
    if(req.session.username){
        res.redirect('/')
    }else{
        next()
    }
  }
app.get("/", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname,'../front/public/index.html'));
});

app.get('/login',loginMiddleware,(req,res)=>{
    res.sendFile(path.join(__dirname,'../front/public/login.html'))
})
app.get('/user',(req,res)=>{
    try{
        res.json(user)
    }catch(err){
        res.json({error:true,message:err})
    }
})
app.post('/login', async(req,res)=>{
    try{
        req.session.username= await req.body.username
        user=req.session.username
        res.redirect("/");
    }catch(err){
        res.json({error:true,message:err})
    }
    
})

app.get("/logout", authMiddleware, async (req, res) => {
    req.session.destroy(err => {
      try {
        res.sendFile(path.join(__dirname, "../front/public/login.html"));
      } catch (err) {
        res.json({ error: true, message: err })
      }
    })
  });
app.listen(8080, (err) => {
  if (err) {
    console.log("Error al conectar con el servidor");
  } else {
    console.log("Conexion exitosa al puerto 8080");
  }
});
