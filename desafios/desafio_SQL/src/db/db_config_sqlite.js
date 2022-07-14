
const path = require("path");
const databaseSQLite = {
  client: "sqlite3",
  connection: {
    filename: path.join(__dirname, "./ecommerce.sqlite"),
  },
  useNullAsDefault: true,
};
console.log(databaseSQLite);

module.exports = databaseSQLite;
