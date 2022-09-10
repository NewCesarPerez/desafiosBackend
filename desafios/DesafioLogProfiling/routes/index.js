import path from "path";
import { fileURLToPath } from "url";
import { fork } from "child_process";
import ARGS from "../yargs/configuration.js";
import os from "os";
import {
  loggerConsola,
  loggerErrorFile,
  loggerWarnFile,
} from "../loggerConfig.js";
const cpus = os.cpus();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function redirectFromRoot(req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/home");
  } else {
    res.redirect("/login");
  }
}
export function getData(req, res) {
  try {
    loggerConsola.info(
      `Petición recibida para el endpoint: /data, método: GET`
    );
    res.send("datos");
  } catch (error) {
    loggerConsola.error(error);
    loggerErrorFile.error(error);
  }
}
export function getSignup(req, res) {
  try {
    loggerConsola.info(
      `Petición recibida para el endpoint: /signup, método: GET`
    );
    res.sendFile(path.join(__dirname, "../views/signup.html"));
  } catch (error) {
    loggerConsola.error(error);
    loggerErrorFile.error(error);
  }
}
export function getHome(req, res) {
  try {
    let user = req.session.user;
    loggerConsola.info(
      `Petición recibida para el endpoint: /home, método: GET`
    );
    res.render("main.ejs", { name: user.firstName });

  } catch (error) {
    loggerConsola.error(error);
    loggerErrorFile.error(error);
  }
}
export function getInfo(req, res) {
  try{
    const memoria = JSON.stringify(process.memoryUsage(), null, 4);
    const OperativeInfo = {
      Puerto: ARGS.puerto,
      Procesadores: cpus.length,
      Pid: process.pid,
      SO: process.platform,
      Memory: memoria,
      NodeVersion: process.version,
      ExecPath: process.execPath,
      ProjectFolder: process.cwd(),
    };
    console.log(JSON.stringify(OperativeInfo))
    loggerConsola.info(
      `Petición recibida para el endpoint: /info, método: GET`
    );
    
    res.status(200).render("info.ejs", OperativeInfo);
  }catch(error){
    console.log('entrando al catch')
    loggerConsola.error(error);
    loggerErrorFile.error(error);
  }
}
export function postLogin(req, res) {

  try{
    loggerConsola.info(
      `Petición recibida para el endpoint: /lLogin, método: POST`
    );
    req.session.user = req.user;
    res.redirect("/home");
  }catch(error){
    loggerConsola.error(error);
    loggerErrorFile.error(error);
  }
}

export function postSignup(req, res) {
  try{
    loggerConsola.info(
      `Petición recibida para el endpoint: /signup, método: POST`
    );
    let user = req.user;
    res.redirect("/login");
  }catch(error){
    loggerConsola.error(error);
    loggerErrorFile.error(error);
  }
}

export function getFailSignUp(req, res) {
  try{
    loggerConsola.info(
      `Petición recibida para el endpoint: /failsignup, método: GET`
    );
    res.sendFile(path.join(__dirname, "../views/failsignup.html"));
  }catch(error){
    loggerConsola.error(error);
    loggerErrorFile.error(error);
  }
}
export function getFailLogin(req, res) {
  try{
    loggerConsola.info(
      `Petición recibida para el endpoint: /faillogin, método: GET`
    );
    res.sendFile(path.join(__dirname, "../views/faillogin.html"));
  }catch(error){
    loggerConsola.error(error);
    loggerErrorFile.error(error);
  }  
}
export function getLogIn(req, res) {
  try{
    loggerConsola.info(
      `Petición recibida para el endpoint: /login, método: GET`
    );
    res.sendFile(path.join(__dirname, "../views/login.html"));

  }catch(error){
    loggerConsola.error(error);
    loggerErrorFile.error(error);
  }
}
export function getLogout(req, res) {
  try{
    loggerConsola.info(
      `Petición recibida para el endpoint: /logout, método: GET`
    );
    req.logout((err) => {
      if (err) {
        return res.json({ error: true, message: err });
      }
      res.redirect("/");
    });
  }catch(error){
    loggerConsola.error(error);
    loggerErrorFile.error(error);
  }
  
}
export function getNotImplementedRoute(req,res){
  try{
    loggerWarnFile.warn(`Ruta: ${req.url} Método: ${req.method} no implementada`);
    if (req.isAuthenticated()) {
      res.redirect("/home");
    } else {
      res.redirect("/login");
    }
  }catch(error){
    loggerConsola.error(error);
    loggerErrorFile.error(error);
  }
}
export function getApiRandom(req, res) {
  res.send(`Server Cluster ${ARGS.puerto}: Accediendo a ruta /api/random`);
}

export function getRandomCount(req, res) {
  const amount = req.query.cant;
  const forked = fork("./routes/fork/computo.js");

  forked.on("message", (msg) => {
    if (msg === "ready") {
      console.log(amount);
      if (amount) {
        forked.send(amount);
      } else {
        const rep = 100000000;
        forked.send(rep);
      }
    } else {
      res.json(msg);
    }
  });
}
