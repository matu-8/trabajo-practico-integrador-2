import {model, Schema} from "mongoose";

const UserSchema = new Schema({
    username:{      //de 3-20 caracteres
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20 
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
            maxlength: 50 
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
    createdAt:{
        type: Date
    },
    updatedAt:{
        type: Date
    }
});

const UserModel = model('User', UserSchema)
export default UserModel;