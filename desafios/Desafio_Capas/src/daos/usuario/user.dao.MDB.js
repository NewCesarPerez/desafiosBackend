import {ContenedorMongo} from "../../contenedores/contenedorMDB.js";
import userModelSchema from "../../model/user.model.js";

class UserDaoMongo extends ContenedorMongo{
    constructor() {
        super("user", userModelSchema);
      }
}

export default UserDaoMongo