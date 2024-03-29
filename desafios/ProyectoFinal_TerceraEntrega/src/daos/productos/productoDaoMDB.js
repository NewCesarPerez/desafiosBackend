import {ContenedorMongo} from "../../contenedores/contenedorMDB.js";

class ProductoDaoMongo extends ContenedorMongo {
  constructor() {
    super("productos", {
      timestamp: { type: String, required: true, default:Date.now() },
      nombre: { type: String, required: true },
      descripcion: { type: String, required: true },
      codigo: { type: String, required: true },
      precio: { type: Number, required: true },
      foto: { type: String, required: true },
      stock: { type: Number, required: true },
    });
  }
}
export default ProductoDaoMongo;
