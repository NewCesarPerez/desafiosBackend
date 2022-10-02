import user from "../daos/usuario/user.Dao.js"
export default async (req, res, next) => {
 const userNameToFilter=req.user.username
 console.log(userNameToFilter)
  const userToCompare=await user.findOne({username:userNameToFilter})
  console.log(userToCompare)
  const isAdmin=userToCompare.admin
  if (isAdmin) next();
  else res.json({mensaje:"No tienes credenciales para esta operacion"});
};
