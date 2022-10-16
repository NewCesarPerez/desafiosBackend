import {ContenedorMongo} from "../../contenedores/contenedorMDB.js";
import cartModelSchema from "../../model/cart.model.js";
class CarritoDaoMongo extends ContenedorMongo {
  constructor() {
    super("carritos", cartModelSchema);
  }
}
export default CarritoDaoMongo
