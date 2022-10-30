import { buildSchema } from "graphql";
class SchemaModel{
    schema=buildSchema(`
    input AdminInput{
        nombre:String,
        apellido:String,
        unidad: String,
        acceso: Int

    }
    
    type Admin{

        id: ID!,
        nombre:String,
        apellido:String,
        unidad: String,
        acceso: Int
       
    }

    type Query {
        getAdmin(id: ID!): Admin,
        getAdmins(campo:String, valor: String): [Admin]

    }

    type Mutation {
        createAdmin(datos: AdminInput): Admin,
        updateAdmin(id:ID!, datos:AdminInput): Admin,
        deleteAdmin(id:ID!): Admin
    }

`);
}
export default new SchemaModel()
