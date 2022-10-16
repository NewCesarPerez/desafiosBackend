import ContenedorFB from "../../contenedores/contenedorFB.js";

class CarritoDaoFirebase extends ContenedorFB {
  constructor() {
    super("carritos");
  }

  create(){
    return this.create({productos:[], timeStamp:Date.now()})
  }
}
export default CarritoDaoFirebase;