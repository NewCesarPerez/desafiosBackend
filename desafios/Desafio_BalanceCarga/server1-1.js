import rutas from "./routes/routes.js";
import express from "express";

import os from "os";
import cluster from "cluster";

import ARGS from "./yargs/configuration.js";
import dotenv from "dotenv";
dotenv.config();
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
import user from "./model/user.js";
import { getApiRandom} from "./routes/index.js";


const conectarDB = async () => {
  try {
    const URL = config.mongodb;
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexion establecida con la db");
  } catch (error) {
    console.log(error);
  }
};
const app = express();
const cpus = os.cpus();
const isCluster = ARGS.modo === "cluster";

if (isCluster && cluster.isPrimary) {
  cpus.map((item) => {
    cluster.fork();
  });
  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.id} has died`);
    cluster.fork();
  });
} else {
  app.set("view engine", "ejs");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    session({
      secret: config.session,
      resave: false,
      rolling: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
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

  passport.deserializeUser(function (id, done) {
    user.findById(id, done);
  });
  app.use(express.static(path.join(__dirname, "../public")));
  app.get('/api/random', getApiRandom);

  app.listen(config.port, (req, res) => {
    console.log(`Escuchando puerto ${config.port}
  Is cluster? ${isCluster}
  Cpus: ${cpus.length} `);
  });
}
