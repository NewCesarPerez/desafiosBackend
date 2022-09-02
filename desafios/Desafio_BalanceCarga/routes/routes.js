import {Router} from 'express'
import { getFailSignUp, getSignup, getLogIn, getHome, getFailLogin, getInfo, getRandomCount, redirectFromRoot } from "./index.js";
import { postSignup, postLogin } from "./index.js";

const router=Router()

function chechAuth(req,res,next){
  console.log(req.session.user)
    if (req.isAuthenticated()){
      return next()
    } else{
      res.json({error:true, message:"you are not log in"})
    }
    
}

router.get('/',(req,res)=>{
  res.send('hola')
})
router.get('/despedida',(req,res)=>{
  res.send('chau')
})

// router.get('hola', (req,res)=>{
//   console.log('entrando a hola')
//   res.send('hola')
// })
// router.get('/home',chechAuth,getHome)
export default router