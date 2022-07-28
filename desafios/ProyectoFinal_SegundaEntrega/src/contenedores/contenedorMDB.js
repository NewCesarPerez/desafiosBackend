import config from "../configuracion/config.js";
import mongoose from "mongoose";

await mongoose.connect(config.mongodb.connectionString);
export class ContenedorMongo {
  constructor(nombreColeccion, esquema) {
    this.Schema=new mongoose.Schema(esquema)
    this.coleccion = mongoose.model(nombreColeccion, this.Schema);
  }

  async create(element) {
    try {
      if (!element) {
        return null;
      } else if (element.length > 1) {
        element.forEach((prod) => {
          prod.timestamp = Date.now();
        });
        await this.coleccion.create(element);
      } else if (typeof element === object) {
        element.timestamp = Date.now();
        await this.coleccion.create(element);
      }

      const elementToReturn = await this.coleccion
        .find()
        .sort({ _id: -1 })
        .limit(1);
      return elementToReturn[0].id;
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
          $set: [
            { nombre: obj.nombre },
            { marca: obj.marca },
            { descripcion: obj.descripcion },
            { codigo: obj.codigo },
            { precio: obj.precio },
            { foto: obj.foto },
            { stock: obj.stock },
          ],
        }
      );
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
      const data = await this.coleccion.find({ _id: number }, { __v: 0 });
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