import {model, Schema} from "mongoose";

const UserSchema = new Schema({
    name:{      //de 3-20 caracteres
        type: String,
        required: true,
        unique: true
    },
    email:{     //formato valido
        type: String,
        unique: true
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
    profile:{
        firstName:{   // de 2-50 caracteres
            type: String,
        },
        lastName:{   // de 2-50 caracteres
            type: String
        },
        biography:{  //opcional
            type: String 
        },
        avatarUrl:{
            type: String,  //opcional, formato URL
        },
        birthDate:{
            type: Date  //opcional, formato de fecha
        }
    },
    createdAt:{
        type: Date
    },
    updatedAt:{
        type: Date
    }
});

const UserModel = model('User', UserSchema)
export default UserModel;