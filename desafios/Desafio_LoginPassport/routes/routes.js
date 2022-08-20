import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getSignup(req, res) {
  res.sendFile(path.join(__dirname, "../views/signup.html"));
}
export function getHome(req,res){
    res.sendFile(path.join(__dirname, "../views/home.html"));
}
export function postLogin(req, res) {
req.session.user =req.user
  res.redirect('/home');
}

export function postSignup(req, res) {
  let user = req.user;

  res.redirect('/login');
}

export function getFailSignUp(req, res) {
  res.sendFile(path.join(__dirname, "../views/failsignup.html"));
}
export function getFailLogin(req, res) {
    res.sendFile(path.join(__dirname, "../views/faillogin.html"));
  }
export function getLogIn(req,res){
    res.sendFile(path.join(__dirname, "../views/login.html"));
}
