import rutas from "./routes/routes.js";
import express from "express";

import os from "os";
import cluster from "cluster";
import dotenv from "dotenv";
dotenv.config();

import { loggerConsola, loggerErrorFile } from "./loggerConfig.js";

import { getNotImplementedRoute } from "./controllers/otherRoutesController.js";
import config from "./config/config.js";
import Yargs from "yargs";
const yargs = Yargs(process.argv.slice(2));

import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";

import signupStrategy from "./strategies/signupStrategy.js";
import loginStrategy from "./strategies/loginStrategy.js";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import mongoose from "mongoose";
import MongoStore from "connect-mongo";

//import user from "./daos/usuario/user.Dao.js";
import userService from "./services/user.service.js";
//import { UserDao } from "./daos/index.js";

const isCluster = config.modo === "CLUSTER";
const Cpus = os.cpus();

//CLUSTER
if (isCluster && cluster.isPrimary) {
  for (let index = 0; index < Cpus.length; index++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    loggerConsola.info(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const conectarDB = async () => {
    try {
      const URL = config.mongodb.URI;
      await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      loggerConsola.info("Conexion establecida con la db");
    } catch (error) {
      loggerConsola.error(error);
      loggerErrorFile.error(error);
    }
  };

  const app = express();
  app.set("views", "./src/views");
  app.set("view engine", "ejs");
  app.use("/api/productos", express.static("html/crearProductos.html"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: config.mongodb.URI,
      }),

      secret: config.session.SECRET,
      resave: false,
      rolling: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 120000,
      },
    })
  );
  conectarDB();
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use("register", signupStrategy);
  passport.use("login", loginStrategy);
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    //user.findById(id, done);

    //UserDao.findUserById(id, done)

    const user = await userService.getUserById(id);
    done(null, user);
  });
  //app.use(express.static(path.join(__dirname, "../public")));
  app.use("/", rutas);
  app.get("*", getNotImplementedRoute);
  app.listen(config.port, (error) => {
    if (error) {
      loggerConsola.error(error);
      loggerErrorFile.error(error);
    } else {
      loggerConsola.info(`
      Servidor conectado al puerto ${config.port}
      Modo: ${config.modo}`);
    }
  });
}
