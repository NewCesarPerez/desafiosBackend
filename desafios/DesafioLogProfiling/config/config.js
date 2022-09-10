import dotenv from 'dotenv'
dotenv.config()
 
import ARGS from "../yargs/configuration.js";

export default {
    mongodb: {
        URI: process.env.MONGO_URL
    },
    session: {
        SECRET: process.env.SECRET
    },
    port: ARGS.puerto,
    modo:ARGS.modo

}