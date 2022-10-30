import axios from "axios";
import AdminController from "./controllers/admin.client.controllers.js";
const adminCtrl = new AdminController();

const options = {
  url: "http://localhost:3000/graphql",
  method: "POST",
  data: adminCtrl.getAdminbyId("322788b4f317e5856a8a"),
};

const response = await axios(options);
console.log(response.data);
