const admin=true

let arrayProductos = [
    {
        id: 1,
        timeStamp: Date.now(),
        nombre: "Pepsi comun",
        descripcion: "Gaseosa sabor original",
        foto: "../imagenes/pepsi.png",
        precio: 130,
        stock: 10,
    },
    {
        id: 2,
        timeStamp: Date.now(),
        nombre: "7up comun",
        descripcion: "Gaseosa sabor original",
        foto: "../imagenes/7up.png",
        precio: 130,
        stock: 10,
    },
    {
        id: 3,
        timeStamp: Date.now(),
        nombre: "Patagonia",
        descripcion: "Cerveza rubia",
        foto: "../imagenes/patagonia.png",
        precio: 350,
        stock: 10,
    },
    {
        id: 4,
        timeStamp: Date.now(),
        nombre: "Hamburguesa de pollo",
        descripcion: "Pan suave, pollo a la plancha, queso de mano y amarillo, panceta, lomo y salsa tartara y papas",
        foto: "../imagenes/Haburguesa de pollo_HDR.jpg",
        precio: 1250,
        stock: 10,
    },
    {
        id: 5,
        timeStamp: Date.now(),
        nombre: "Arepitas fritas",
        descripcion: "Pollo o lomito a la plancha, queso de mano, lechuga y salsa tartara.",
        foto: "../imagenes/Arepitas_tapitas mechada1HDR.jpg",
        precio: 1100,
        stock: 10,
    },
    {
        id: 6,
        timeStamp: Date.now(),
        nombre: "Tequeños",
        descripcion: "Deliciosa masa rellena de queso venezolano.",
        foto: "../imagenes/20211027_233845.jpg",
        precio: 1150,
        stock: 10,
    },

];

const getProducts = (req, res) => {
  console.log(arrayProductos);
  res.send(arrayProductos)
};

const getProductsById=(req, res)=>{
    const idToCompare=Number(req.params.id)
    const productToRender=arrayProductos.find(prod=>prod.id===idToCompare)
    if(!productToRender)res.json({error:'Producto no encontrado'})
    else res.json(productToRender)
}

const postProducts = (req, res) => {
  const { nombre, precio, url } = req.body;
  const productToPush = { nombre: nombre, precio: Number(precio), foto: url, timeStamp:Date.now(), stock:10 };
  if (!arrayProductos.length) {
    productToPush.id = 1;
    console.log("primer console " + productToPush.id);
  } else {
    productToPush.id = arrayProductos[arrayProductos.length - 1].id + 1;
    console.log(
      "console del id del array " + arrayProductos[arrayProductos.length - 1].id
    );
    console.log("seg console " + productToPush.id);
  }
  arrayProductos.push(productToPush);
  res.redirect("/api/productos");
};

const updateProductsById=(req, res)=>{
    const{nombre,precio,url, stock}=req.body
    const idToCompare=Number(req.params.id)
    const productToModify=arrayProductos.find(prod=>prod.id===idToCompare)
    if(!productToModify)res.json({error:'Producto no encontrado'})
    else {
        const Index = arrayProductos.findIndex((prod) => prod.id === idToCompare)
            arrayProductos[Index].nombre=nombre
            arrayProductos[Index].precio=precio
            arrayProductos[Index].foto=url
            arrayProductos[Index].stock=stock
        res.status(200).json('Producto actualizado')
    }
}

const deleteProductById=(req,res)=>{
    const idToCompare=Number(req.params.id)
    const productToErase=arrayProductos.find(prod=>prod.id===idToCompare)
    if(!productToErase)res.json({error:'Producto no encontrado'})
    else {
        arrayProductos=arrayProductos.filter(prod=>prod.id!==idToCompare)
        res.json('Producto eliminado')
    }
}

const isAdmin=(req,res,next)=>{
    if (admin) next()
    else res.sendStatus(401).json('No tienes credenciales para esta operacion')
}
module.exports = {
  getProducts,
  postProducts,
  getProductsById,
  updateProductsById,
  deleteProductById, 
  isAdmin
};
