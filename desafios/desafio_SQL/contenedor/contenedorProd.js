class ContenedorProd {
  constructor(configKnex, tableName) {
    this.configKnex = configKnex;
    this.tableName = tableName;
  }

  async createProductTable() {
    try {
      console.log('creando tabla')
      await this.configKnex.schema.dropTableIfExists(this.tableName);
      await this.configKnex.schema.createTable(this.tableName, (table) => {
        table.increments("id").primary();
        table.string("nombre", 50).notNullable();
        table.string("precio", 50).notNullable();
        table.string("url", 100).notNullable();
      });
      console.log(`${this.tableName} table created!`);
      this.configKnex.destroy();
    } catch (error) {
      console.log('no se pudo crear la tabla')
      console.log(error);
      //this.configKnex.destroy(); //cerrando la conexión
    }
  }
  async insert(data) {
    try {
      if(this.configKnex.schema.hasTable(this.tableName)){
        await this.configKnex(this.tableName).insert(data);
      console.log("Product inserted!");
      //this.configKnex.destroy();
      }else{
       await this.createProductTable()
       await this.configKnex(this.tableName).insert(data)
      }
      
    } catch (error) {
      console.log(error);
      this.configKnex.destroy();
    }
  }
  async deleteAll() {
    try {
      await await this.this.configKnex.schema.dropTableIfExists(this.tableName);
      console.log(`${this.tableName} have been dropped`);
    } catch (error) {
      console.log(`Deleting error: ${error}`);
    }
  }
  async getById(id) {
    try {
      const productById = await this.configKnex
        .from(this.tableName)
        .select("*")
        .where("id", "=", id);
      console.log("Select exitoso");
      this.configKnex.destroy();
      return productById;
    } catch (error) {
      console.log(error);
      this.configKnex.destroy();
    }
  }

  async getAll() {
    try {
      const productArray = await this.configKnex.from(this.tableName).select("*");
      console.log("Select exitoso");
      this.configKnex.destroy();
      return productArray;
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

module.exports = ContenedorProd;
