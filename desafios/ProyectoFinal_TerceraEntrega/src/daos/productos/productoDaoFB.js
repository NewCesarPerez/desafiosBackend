import ContenedorFB from "../../contenedores/contenedorFB.js";

export class ProductoDaoFirebase extends ContenedorFB {
  constructor() {
    super("productos");
  }
}
export default ProductoDaoFirebase;