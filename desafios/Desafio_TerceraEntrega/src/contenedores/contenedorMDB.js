import config from "../config/config.js";
import mongoose from "mongoose";

await mongoose.connect(config.mongodb.URI);
export class ContenedorMongo {
  constructor(nombreColeccion, esquema) {
    this.Schema = new mongoose.Schema(esquema);
    this.coleccion = mongoose.model(nombreColeccion, this.Schema);
  }

  async create(element) {
    try {
      if (!element) {
        return null;
      } else {
        const inserted = await this.coleccion.create(element);
        return inserted;
      }
    } catch (error) {
      console.log(`Saving error: ${error}`);
      throw error;
    }
  }

  async update(id, obj) {
    try {
      //Obtenemos los datos
      await this.coleccion.updateOne(
        { id: id },
        {
          $set: obj,
        }
      );
      const updatedProduct = await this.coleccion.findOne({ _id: id }, { __v: 0 });
      return updatedProduct
    } catch (error) {
      console.log(`Saving error: ${error}`);
      throw error;
    }
  }

  async deleteAll() {
    try {
      await this.coleccion.deleteMany({});
    } catch (error) {
      console.log(error);
    }
  }
  async readById(number) {
    try {
      const data = await this.coleccion.findOne({ _id: number }, { __v: 0 });
      if (data === undefined) return null;
      else return data;
    } catch (error) {
      console.log(error);
    }
  }

  async readAll() {
    try {
      const data = await this.coleccion.find({}, { __v: 0 });
      if (data === undefined) return null;
      else return data;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(number) {
    try {
     await this.coleccion.deleteOne({ _id: number });
    
    } catch (error) {
      console.log(error);
    }
  }
}

//export default ContenedorMongo
