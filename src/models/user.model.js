import { model, Schema } from "mongoose";
import ArticleModel from "./article.model.js";

const UserSchema = new Schema(
  {
    username: {
      //de 3-20 caracteres
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
      match: /^[a-zA-Z0-9]+$/,
    },
    email: {
      //formato valido
      type: String,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: {
      //hasheada
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },

    //Relacion uno a uno con perfil embebido en el documento de usuario
    profile: {
      firstName: {
        // de 2-50 caracteres
        type: String,
        minlength: 2,
        maxlength: 50,
      },
      lastName: {
        // de 2-50 caracteres
        type: String,
        minlength: 2,
        maxlength: 50,
      },
      biography: {
        //opcional
        type: String,
        maxlength: 500,
      },
      avatarUrl: {
        type: String, //opcional, formato URL
      },
      birthDate: {
        type: Date, //opcional, formato de fecha
      },
    },
  },
  {
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/*
Para implementar correctamente la eliminación lógica, necesitas hacer dos cosas:
Modificar la lógica de "eliminación" para que en realidad sea una actualización.
Modificar todas las consultas de "búsqueda" (find, findOne, etc.)
para que excluyan automáticamente los documentos marcados como eliminados.
*/

///middleware para eliminacion logica de usuario///
UserSchema.pre("findOneAndDelete", async function (next) {
  const isUserFound = this.getFilter(); //si se encuentro un usuario, tomo el filtro de la consulta y obtengo el id del mismo
  if (isUserFound) {
    await this.model.updateOne(isUserFound, { deletedAt: new Date() }); //extraer la conuslta ya me sirve para poder actualizar el campo deletAt con una fecha
    
  }
    throw new Error("No se ha encontrado el usuario especificado")
});

//Eliminacion de usuario con sus articulos en cascada
UserSchema.pre("findOneAndDelete", async function (next) {
  //Antes de ejecutarse esta accion "findOneandDelete"
  const user = await this.model.findOne(this.getFilter()); //de "este modelo" (UserModel), extraigo la consulta que hago en el controlador para buscar un usuario por id

  if (user) {
    await ArticleModel.deleteMany({ author: article._id }); //Busco articulos que pertenezcan a este usuario y los elimina
  }
  next(); //continua ejecucion
});
const UserModel = model("User", UserSchema);
export default UserModel;
