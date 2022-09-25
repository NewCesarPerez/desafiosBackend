import {ContenedorMongo} from "../../contenedores/contenedorMDB.js";

class CarritoDaoMongo extends ContenedorMongo {
  constructor() {
    super("carritos", {
      timestamp: { type: String, required: true, default: Date.now() },
      productos: { type: Array, required: true },
    });
  }
}
export default CarritoDaoMongo
