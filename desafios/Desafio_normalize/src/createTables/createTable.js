const {normalize,schema, denormalize}=require('normalizr')

const sqlite3Config = require("../db/db_config_sqlite");
const mysqlConfig = require("../db/db_config_mysql");
const knex = require("knex");
const databaseSms = knex(sqlite3Config);
const databaseProduct = knex(mysqlConfig);
const createSmsTable = async () => {
  try {
    await databaseSms.schema.dropTableIfExists("mensajes");

    await this.configKnex.schema.createTable("mensajes", (table) => {
      table.string("id", 50).primary();
      table.string("nombre", 250).notNullable();
      table.string("apellido", 250).notNullable();
      table.number("edad").notNullable();
      table.string("alias", 100).notNullable();
      table.string("avatar", 100).notNullable();
    });

    console.log("Sms table created!");

    databaseSms.destroy();
  } catch (error) {
    console.log(error);
    databaseSms.destroy();
  }
};

const createProductTable = async () => {
  try {
    await databaseProduct.schema.dropTableIfExists("productos");

    await this.configKnex.schema.createTable("productos", (table) => {
      table.increments("id").primary();
      table.string("nombre", 50).notNullable();
      table.string("precio", 50).notNullable();
      table.string("url", 100).notNullable();
    });

    console.log("Product table created!");

    databaseProduct.destroy();
  } catch (error) {
    console.log(error);
    databaseProduct.destroy();
  }
};

createSmsTable();
createProductTable();
