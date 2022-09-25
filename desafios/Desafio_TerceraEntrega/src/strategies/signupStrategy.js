import passportLocal from "passport-local"
import path from "path";
import config from "../config/config.js";
import {createTransport} from "nodemailer"
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import bcrypt from "bcrypt"
import user from "../model/user.js"
import { loggerConsola } from "../loggerConfig.js";

//NODEMAILER
const trasporter=createTransport({
    host: 'smtp.ethereal.email',
      port: config.ethereal.PORT,
      auth: {
          user: config.ethereal.EMAIL,
          pass: config.ethereal.PASSWORD
      }
  })
  
  
  //STRATEGY
function hashPassword(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }
const signupStrategy= new passportLocal.Strategy(
    {passReqToCallback:true},
    async (req,username,password,done)=>{
        try{
            const existingUser=await user.findOne({username})
            if(existingUser) done(null,false)

            const newUser={
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                address:req.body.address,
                age:Number(req.body.age),                
                username:username,
                password:hashPassword(password),
                telephone:req.body.telephone,
                avatar:req.body.avatar
                
            }
            
            const createdUser= await user.create(newUser)
            console.log('Ethereal email: '+config.ethereal.EMAIL)
            const mailOptions={
                from: 'Servidor node.js',
                to:config.ethereal.EMAIL,
                subject: 'Nuevo registro',
                html: `
                <p  text-primary" for="firstNameId">Nombre: ${newUser.firstName}  </p>    
                <p  text-primary" for="lastNameId">Apellido: ${newUser.lastName} </p> 
                <p  text-primary" for="emailInputId">Email: ${newUser.email}</p>
                <p  text-primary" for="addressInputId"><i class="fa fa-home" aria-hidden="true"></i> Dirección: ${newUser.address}</p>
                <p  text-primary" for="ageInputId"><i class="fa fa-home" aria-hidden="true"></i> <i class="fa fa-angellist" aria-hidden="true"></i>Edad: ${newUser.age}</p>
                <p  text-primary" for="userNameId">UserName: ${newUser.username}</p>
                <p  text-primary" for="userNameId">Contraseña: ${newUser.password}</p>
                <p  text-primary" for="userNameId">Contraseña: ${newUser.telephone}</p>
                <p  text-primary" for="userNameId">Contraseña: ${newUser.avatar}</p>

                `
              }
              const info= await trasporter.sendMail(mailOptions)
              loggerConsola.info(info);
            return done(null, createdUser)
        }catch(err){
                console.log(err)
                done(err)
        }
    }
    )

    export default signupStrategy