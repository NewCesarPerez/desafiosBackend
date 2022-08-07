const { faker } = require("@faker-js/faker");
faker.locale = "es";
const productos=[]
for (i=0;i<5;i++){
    productos.push({
        nombre: faker.commerce.productName(),
        precio: faker.commerce.price(),
        foto: faker.image.business(),
      })
}
console.log(productos);
module.exports=productos
