const admin = true;
module.exports = (req, res, next) => {
  if (admin) next();
  else res.sendStatus(401).json("No tienes credenciales para esta operacion");
};
