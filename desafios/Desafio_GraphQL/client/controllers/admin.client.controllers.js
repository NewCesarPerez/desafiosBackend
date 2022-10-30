class AdminController {
  createAdmin = (nombre, apellido, unidad, acceso) => {
    const adminToCreate = {
      operationName: "createAdmin",
      query: `mutation createAdmin{
                  createAdmin(datos:{nombre:"${nombre}",apellido: "${apellido}", unidad:"${unidad}", acceso:${acceso}}){
                    id,
                    nombre,
                    unidad,
                    acceso
                    
                }
      
          }`,
    };
    return adminToCreate;
  };

  getAdminbyId = (id) => {
    return {
      operationName: "getAdmin",
      query: `query getAdmin{
                  getAdmin(id:"${id}"){
                      nombre,
                      unidad,
                      acceso
                  }
              }`,
    };
  };

  getAllAdmins = {
    operationName: "getAdmins",
    query: `query getAdmins{
                  getAdmins{
                      id,
                      nombre,
                      unidad,
                      acceso
                  }
              }`,
  };

  deleteAdmin = (id) => {
    return {
      operationName: "deleteAdmin",
      query: `mutation deleteAdmin{
                    deleteAdmin(id:"${id}"){
                        nombre,
                        unidad,
                        acceso
                    }
                }`,
    };
  };
}
export default AdminController
