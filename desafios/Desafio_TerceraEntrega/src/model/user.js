import mongoose from "mongoose";
//se define el esquema

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, max: 100 },
  lastName: { type: String, required: true, max: 100 },
  email: { type: String, required: true, max: 100 },
  address:{type: String, required: true, max: 150},
  age: {type: Number, required: true, max: 150},
  username: { type: String, unique:true, required: true, max: 100 },
  password: { type: String, required: true },
  telephone: {type: Number, required: true},
  avatar: { type: String, required: true }
});
//se usa el nombre de la coleccion y el esquema para crear el modelo, que es una especie de plantilla para cada registro
const userModel=mongoose.model('user', userSchema)
export default userModel