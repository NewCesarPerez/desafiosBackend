import {ContenedorMongo} from "../../contenedores/contenedorMDB.js";
import productModelSchema from "../../model/product.model.js";

class ProductoDaoMongo extends ContenedorMongo {
  constructor() {
    super("productos", productModelSchema);
  }
}
export default ProductoDaoMongo;
