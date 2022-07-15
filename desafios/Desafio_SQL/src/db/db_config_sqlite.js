
const path = require("path");
const databaseSQLite =require('knex')({
  client: "sqlite3",
  connection: {
    filename: "./ecommerce.sqlite",
  },
  useNullAsDefault: true,
});


module.exports = databaseSQLite;
