import passportLocal from "passport-local"
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import bcrypt from "bcrypt"
import user from "../model/user.js"


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
                username:username,
                password:hashPassword(password),
                email:req.body.email
                
            }
            const createdUser= await user.create(newUser)
            return done(null, createdUser)
        }catch(err){
                console.log(err)
                done(err)
        }
    }
    )

    export default signupStrategy