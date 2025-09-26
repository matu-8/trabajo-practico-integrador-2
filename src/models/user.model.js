import {model, Schema} from "mongoose";
import ArticleModel from "./article.model.js";

const UserSchema = new Schema({
    username:{      //de 3-20 caracteres
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
        match: /^[a-zA-Z0-9]+$/ 
    },
    email:{     //formato valido
        type: String,
        unique: true,
        match:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password:{  //hasheada
        type: String,
        required:true
    },
    role:{
        type: String,   
        enum:['admin','user'],
        default:'user',
        required:true,
    },
    profile:
        {
        firstName:{   // de 2-50 caracteres
            type: String,
            minlength: 2,
            maxlength: 50,
        },
        lastName:{   // de 2-50 caracteres
            type: String,
            minlength: 2,
            maxlength: 50 
        },
        biography:{  //opcional
            type: String,
            maxlength:500 
        },
        avatarUrl:{
            type: String,  //opcional, formato URL  
        },
        birthDate:{
            type: Date  //opcional, formato de fecha
        }
    },
},
{
    timestamps:true
}
);
//Eliminacion de usuario con sus articulos
UserSchema.pre("findOneAndDelete", async function(next) {
    const article = await this.model.findOne(this.getFilter())

    if(article){
        await ArticleModel.deleteMany({author:article._id})
    }
    next();
})
const UserModel = model('User', UserSchema)
export default UserModel;