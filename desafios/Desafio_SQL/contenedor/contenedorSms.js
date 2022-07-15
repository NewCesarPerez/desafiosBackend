

class ContenedorSms {
  constructor(configKnex, tableName) {
    this.configKnex = configKnex;
    this.tableName = tableName;
    this.configKnex.schema.hasTable(this.tableName).then(exists=>{
      if(!exists){
        return this.configKnex.schema.createTable(this.tableName, (table) => {
          table.increments("id").primary();
          table.string("email", 50).notNullable();
          table.string("mensaje", 250).notNullable();
          table.string("fecha", 100).notNullable();
        });
      }
    }).catch(err=>console.log(err +'Error creando la tabla dentro del constructor'))
  }



  async createMessageTable() {
    try {
      await this.configKnex.schema.dropTableIfExists(this.tableName);
      await this.configKnex.schema.createTable(this.tableName, (table) => {
        table.increments("id").primary();
        table.string("email", 50).notNulleable();
        table.string("mensaje", 250).notNulleable();
        table.string("fecha", 100).notNulleable();
      });
      console.log(`${this.tableName} table created!`);
      this.configKnex.destroy();
    } catch (error) {
      console.log(`error creando la tabla: ${error}`);
      this.configKnex.destroy(); //cerrando la conexión
    }
  }

  async insert(data) {
    try {
      await this.configKnex(this.tableName).insert(data);
      console.log("message inserted!");
      //this.configKnex.destroy();
    } catch (error) {
      console.log(`error insertando en tabla: ${error}`);
      this.configKnex.destroy();
    }
  }
  async deleteAll() {
    try {
      await this.configKnex.schema.dropTableIfExists(this.tableName);
      console.log(`${this.tableName} have been dropped`);
    } catch (error) {
      console.log(`Deleting error: ${error}`);
    }
  }
  async getById(id) {
    try {
      const smsById = await this.configKnex
        .from(this.tableName)
        .select("*")
        .where("id", "=", id);
      console.log("Select exitoso");
      this.configKnex.destroy();
      return smsByid;
    } catch (error) {
      console.log(error);
      this.configKnex.destroy();
    }
  }

  async getAll() {
    try {
      const smsArray = await this.configKnex.from(this.tableName).select("*");
      console.log("Select exitoso");
      //this.configKnex.destroy();
      return smsArray;
    } catch (error) {
      console.log(error);
      this.configKnex.destroy();
    }
  }
  async deleteById(number) {
    try {
      await this.configKnex
        .from(this.tableName)
        .select("*")
        .where("id", "=", id)
        .del();
      console.log("Delete exitoso");
      this.configKnex.destroy();
    } catch (error) {
      console.log(error);
      this.configKnex.destroy();
    }
  }
}

module.exports = ContenedorSms;
