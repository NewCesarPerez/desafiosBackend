const sqlite3Config = require("../db/db_config_sqlite");
const knexBaseContainer = require('./knexBase')

class ContenedorSms extends knexBaseContainer{
  constructor(config,tableName){
    super(config,tableName)
  }
}
module.exports = new ContenedorSms(sqlite3Config,'mensajes');
