class KnexBase {
  constructor(configKnex, tableName) {
    this.configKnex = configKnex;
    this.tableName = tableName;
  }
  async insert(data) {
    try {
      const newElement = await this.configKnex(this.tableName).insert(data);
      console.log("message inserted!");
      return newElement;
      //this.configKnex.destroy();
    } catch (error) {
      console.log(`error insertando en tabla: ${error}`);
    }
  }
  async getAll() {
    try {
      const data = await this.configKnex.from(this.tableName).select("*");
      console.log("Select exitoso");
      //this.configKnex.destroy();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id) {
    try {
      const elementById = await this.configKnex
        .from(this.tableName)
        .select("*")
        .where("id", "=", id);
      console.log("Select exitoso");

      return elementById;
    } catch (error) {
      console.log(error);
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

  async deleteById(number) {
    try {
      await this.configKnex
        .from(this.tableName)
        .select("*")
        .where("id", "=", id)
        .del();
      console.log("Delete exitoso");
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports=KnexBase
