import { json } from "express";
import { CarritoDao, ProductoDao } from "../daos/index.js";
import config from "../config/config.js";
import { createTransport } from "nodemailer";
import twilio from "twilio";
import { loggerConsola } from "../loggerConfig.js";

//NODEMAILER
const trasporter = createTransport({
  host: "smtp.ethereal.email",
  port: config.ethereal.PORT,
  auth: {
    user: config.ethereal.EMAIL,
    pass: config.ethereal.PASSWORD,
  },
});

//TWILIO - SMS
const accountSid = config.twilio.ACCOUNTSID;
const accountToken = config.twilio.ACCOUNTTOKEN;

const client = twilio(accountSid, accountToken);


//RUTAS - Carrito
export const postCarrito = async (req, res) => {
  try {
    const cart = req.body;
    //Twilio - SMS
    const options = {
      body: "Pedido confirmado y en proceso. Lo estaremos contactando con novedades.",
      from: config.twilio.PHONENUMBER,
      to: "+" + req.user.telephone,
    };
    const smsMessage = await client.messages.create(options);
    //TWILIO - Email
    let emailBody;
    cart.productos.map((product) => {
      return (emailBody += `
      <p class= "text-primary" >Nombre: ${product.nombre}  </p>    
      <p class= "text-primary">Codigo: ${product.codigo} </p> 
      <p class= "text-primary">Precio: ${product.precio}</p>`);
    });
    const mailOptions = {
      from: "Servidor node.js",
      to: config.ethereal.EMAIL,
      subject: `Nuevo Pedido - Cliente: ${req.user.firstName} ${req.user.lastName}, Email: ${req.user.email} `,
      html: emailBody,
    };
    const info = await trasporter.sendMail(mailOptions);

    //TWILIO - Whatsapp
    let whatsappBody;
    cart.productos.map((product) => {
      return (whatsappBody += `
      Nuevo Pedido
      Cliente: ${req.user.firstName} ${req.user.lastName}, 
      Email: ${req.user.email} 
      Nombre: ${product.nombre},
      Código: ${product.codigo}, 
      Precio: ${product.precio}</p>`);
    });

    const optionsWhatsapp = {
      body: whatsappBody,
      mediaUrl:[
        "https://www.tiendadiggit.com.ar/Image/0/450_450-QN55Q65BAGCZB_1.jpg"
      ],
      from: config.twilio.PHONENUMBER,
      to: "+" + req.user.telephone,
    };
    const wspMessage=await client.messages.create(optionsWhatsapp)
    const cartId = await CarritoDao.create(cart);
    
    
   
    loggerConsola(smsMessage);
    loggerConsola(info);
    loggerConsola(wspMessage);
    res.status(201).json(cartId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

export const postProductInCartById = async (req, res) => {
  const idProductToCompare = req.body.id;
  const cartIdToUse = req.params.id;
  if (idProductToCompare && cartIdToUse) {
    const productById = await ProductoDao.readById(idProductToCompare);
    const cartById = await CarritoDao.readById(cartIdToUse);
    const cart = await CarritoDao.readAll();
    const index = cart.findIndex((element) => element.id === cartById.id);
    cartById.productos.push(productById);
    await CarritoDao.update(cartById.id, cartById);
    const cartByIdUpdated = await CarritoDao.readById(cartIdToUse);
    res.status(201).json({ cart: cartByIdUpdated });
  } else {
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};
export const getCarrito = async (req, res) => {
  try {
    const idToCompare = req.params.id;
    const carritoToRender = await CarritoDao.readById(idToCompare);
    if (!carritoToRender)
      res.status(500).json({ error: "Carrito no encontrado" });
    else {
      res.json(carritoToRender.productos);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Hubo un error" });
  }
};

export const deleteCarritoById = async (req, res) => {
  try {
    const idToCompare = req.params.id;
    await CarritoDao.deleteById(idToCompare);
    res.status(201).json({ eliminated: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

export const deleteProductFromCartById = async (req, res) => {
  const cartIdToUse = req.params.id;
  const idProductToCompare = req.params.id_prod;
  if (idProductToCompare && cartIdToUse) {
    const cartById = await CarritoDao.readById(cartIdToUse);
    cartById.productos = cartById.productos.filter((prod) => {
      prod.id !== idProductToCompare;
    });
    await CarritoDao.update(cartById.id, cartById);
    res.status(201).json({ eliminated: true });
  } else {
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};
