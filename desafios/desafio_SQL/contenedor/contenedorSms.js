

class ContenedorSms {
  constructor(configKnex, tableName) {
    this.configKnex = configKnex;
    this.tableName = tableName;
  }

  database = require("knex")(this.configKnex);

  async createMessageTable() {
    try {
      await this.database.schema.dropTableIfExists(this.tableName);
      await this.database.schema.createTable(this.tableName, (table) => {
        table.increments("id").primary();
        table.string("email", 50).notNulleable();
        table.string("mensaje", 250).notNulleable();
        table.string("fecha", 100).notNulleable();
      });
      console.log(`${this.tableName} table created!`);
      database.destroy();
    } catch (error) {
      console.log(error);
      database.destroy(); //cerrando la conexión
    }
  }

  async insert(data) {
    try {
      await database(this.tableName).insert(data);
      console.log("message inserted!");
      database.destroy();
    } catch (error) {
      console.log(error);
      database.destroy();
    }
  }
  async deleteAll() {
    try {
      await await this.database.schema.dropTableIfExists(this.tableName);
      console.log(`${this.tableName} have been dropped`);
    } catch (error) {
      console.log(`Deleting error: ${error}`);
    }
  }
  async getById(id) {
    try {
      const smsById = await database
        .from(this.tableName)
        .select("*")
        .where("id", "=", id);
      console.log("Select exitoso");
      database.destroy();
      return smsByid;
    } catch (error) {
      console.log(error);
      database.destroy();
    }
  }

  async getAll() {
    try {
      const smsArray = await database.from(this.tableName).select("*");
      console.log("Select exitoso");
      database.destroy();
      return smsArray;
    } catch (error) {
      console.log(error);
      database.destroy();
    }
  }
  async deleteById(number) {
    try {
      await database
        .from(this.tableName)
        .select("*")
        .where("id", "=", id)
        .del();
      console.log("Delete exitoso");
      database.destroy();
    } catch (error) {
      console.log(error);
      database.destroy();
    }
  }
}

module.exports = ContenedorSms;
