import express from "express";
import { graphqlHTTP } from "express-graphql";
import schemaModel from "./models/admin.model.js";
import AdminController from "./controllers/admin.controllers.js";

const schema = schemaModel.schema;
const adminControler = new AdminController();

const app = express();

//definir endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: {
      getAdmin: adminControler.getAdmin,
      getAdmins: adminControler.getAdmins,
      createAdmin: adminControler.createAdmin,
      updateAdmin: adminControler.updateAdmin,
      deleteAdmin: adminControler.deleteAdmin,
    },
    graphiql: true,
  })
);
app.listen(3000, () => {
  try {
    console.log("Escuchando puerto 3000");
  } catch (error) {
    console.log("Error message: " + error);
  }
});
