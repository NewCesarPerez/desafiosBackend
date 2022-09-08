import path from "path";
import { fileURLToPath } from "url";
import { fork } from "child_process";
import ARGS from "../yargs/configuration.js"
import os from 'os'
const cpus=os.cpus()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function redirectFromRoot(req,res){
    
    if(req.isAuthenticated()){
        res.redirect('/home')
      }else{
        res.redirect('/login')
      }
}
export function getData(req,res){
    res.send('datos')
}
export function getSignup(req, res) {
  res.sendFile(path.join(__dirname, "../views/signup.html"));
}
export function getHome(req,res){
    
    let user=req.session.user
    console.log(user.firstName)
    res.render('main.ejs', {name:user.firstName})
  }
export function getInfo(req, res) {
  res.json({
    Puerto: ARGS.puerto,
    Procesadores: cpus.length,
    Pid: process.pid,
    SO: process.platform,
    Memory: process.memoryUsage(),
    NodeVersion: process.version,
    ExecPath: process.execPath,
    ProjectFolder: process.cwd(),
  });
}
export function postLogin(req, res) {
  req.session.user = req.user;
  res.redirect("/home");
}

export function postSignup(req, res) {
  let user = req.user;

  res.redirect("/login");
}

export function getFailSignUp(req, res) {
  res.sendFile(path.join(__dirname, "../views/failsignup.html"));
}
export function getFailLogin(req, res) {
  res.sendFile(path.join(__dirname, "../views/faillogin.html"));
}
export function getLogIn(req, res) {
  res.sendFile(path.join(__dirname, "../views/login.html"));
}
export function getLogout(req, res){
  req.logout((err)=> {
    if (err) { return res.json({error:true,message:err}); }
    res.redirect('/');
  });
}
export function getApiRandom(req,res){
  res.send(`Server Cluster ${ARGS.puerto}: Accediendo a ruta /api/random`)
}

export function getRandomCount(req, res) {
  const amount = req.query.cant
  const forked = fork("./routes/fork/computo.js");

  forked.on("message", (msg) => {
    if (msg === "ready") {
      console.log(amount)
      if (amount) {
        forked.send(amount );
      } else {
        const rep = 100000000;
        forked.send( rep );
      }
    } else {
      res.json(msg);
    }
  });
}
