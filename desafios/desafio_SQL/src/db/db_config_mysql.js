const databaseMysql = require("knex")({
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root", //cololar siempre root
      password: "", // sin clave salvo que tengamos
      database: "ecommerce",//nombre de la base de datos que queremos usar
    },
    pool: { min: 0, max: 7 }, //numero min y max de hilos que puede usar
  });
  module.exports=databaseMysql;