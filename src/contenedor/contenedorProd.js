const knexBaseContainer = require('./knexBase')
const mySqlConfig=require('../db/db_config_mysql')
class ContenedorProd extends knexBaseContainer {
  constructor(configKnex, tableName) {
    super(configKnex, tableName)
  }
}
module.exports = new ContenedorProd(mySqlConfig, 'productos');
