import express from 'express';
const app = express();
import rutas from "./rutas/index.js";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
//const path =require("path") ;
import {engine} from "express-handlebars";

//Configuración hadlebars

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/public"));

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: path.join(__dirname, "./views/layouts/main.hbs"),
    layoutsDir: path.join(__dirname, "./views/layouts"),
    partialsDir: path.join(__dirname, "./views/partials"),
  })
);
app.set("views", "./views");
app.set("view engine", "hbs");

app.use("/", rutas);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry cant find that!");
});

app.listen(8080, (err) => {
  if (err) console.log("Hubo un error");
  else console.log("Escuchando puerto 8080");
});
