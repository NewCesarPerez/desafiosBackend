import crypto from "crypto";
import Admin from "../graphql.classes/admin.class.js";
const adminMap = {};//admin map se crea para almacenar
class AdminController {
  createAdmin = ({ datos }) => {
    const id = crypto.randomBytes(10).toString("hex");
    const nuevaAdmin = new Admin(id, datos);
    adminMap[id] = nuevaAdmin;
    return nuevaAdmin;
  };
  getAdmin = ({ id }) => {
    if (!adminMap[id]) throw new Error("Admin does not exists");
    return adminMap[id];
  };

  getAdmins = ({ campo, valor }) => {
    const Admins = Object.values(adminMap);
    if (campo && valor) {
      return Admins.filter((Admin) => Admin[campo] == valor);
    } else {
      return Admins;
    }
  };

  updateAdmin = ({ id, datos }) => {
    if (!adminMap[id]) throw new Error("Admin does not exists");
    const AdminActualizado = new Admin(id, datos);
    adminMap[id] = AdminActualizado;
    return AdminActualizado;
  };

  deleteAdmin = ({ id }) => {
    if (!adminMap[id]) throw new Error("Admin does not exists");
    const erasedAdmin = adminMap[id];
    delete adminMap[id];
    return erasedAdmin;
  };
}

export default AdminController;
