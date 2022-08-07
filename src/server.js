const express = require("express");
const app = express();
const path = require("path");
const mockProducts = require("../src/mocks/mockProducts");
const { Server: IOServer } = require("socket.io");
const fs = require("fs");
const expressServer = app.listen(8080, () =>
  console.log("Escuchando servidor 8080")
);
const io = new IOServer(expressServer);

//NORMALIZR
const { normalize, schema, denormalize } = require("normalizr");
const util = require("util");
function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true));
}

const messagesNormalizar = [];
const products = [];

async function escribir() {
  try {
    await fs.promises.writeFile(
      path.join(__dirname, "/chat"),
      JSON.stringify(messagesNormalizar)
    );
    console.log("Guardado exitoso");
  } catch (err) {
    console.log("Error guardando en el chat", err);
  }
}
//const messages = [];

const mysql = require("./db/db_config_mysql");
const productClass = require("./contenedor/contenedorProd");
const { json } = require("express");
//const sqlite = require("./db/db_config_sqlite");
//const messagesClass = require("./contenedor/contenedorSms");
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  await productClass.createProductTable();
});
app.get("/api/productos-test", (req, res) => {
  res.send(mockProducts);
});
app.post("/", async (req, res) => {
  const { nombre, precio, url } = req.body;
  console.log(nombre);
  const productToPush = { nombre: nombre, precio: precio, url: url };
  products.push(productToPush);
  await productClass.insert(products);
  console.log(products);
});

io.on("connection", async (socket) => {
  const authorSchema = new schema.Entity(
    "authors",
    {},
    { idAttribute: "mail" }
  );
  const commentSchema = new schema.Entity(
    "comments",
    { author: authorSchema },
    { idAttribute: "id" }
  );

  const chatSchema = new schema.Entity(
    "chats",
    { comments: [commentSchema] },
    { idAttribute: "id" }
  );
  let normalizedChat = normalize(
    { id: "chat1", comments: messagesNormalizar },
    chatSchema
  );
 
  console.log("Se conecto un usuario nuevo");
  //const messagesLog = await messagesClass.getAll();
  io.emit("server:message", normalizedChat);
  socket.on("client:messageNormalizar", async (data) => {
    data.id = messagesNormalizar.length + 1;
    messagesNormalizar.push(data); //RECIBO mensaje y lo anido
    escribir();
    normalizedChat = normalize(
      { id: "chat1", comments: messagesNormalizar },
      chatSchema
    );
    print(normalizedChat);
    console.log('longitud del objeto sin normalizar: '+JSON.stringify(messagesNormalizar).length)
    console.log('longitud del objeto normalizado: '+JSON.stringify(normalizedChat).length)
    io.emit("server:message", normalizedChat);
  });
  socket.emit("server:products", products);
});


