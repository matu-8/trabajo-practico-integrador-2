import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId 

const ArticleSchema = new Schema({
    title:{
        type: String,
        minlength: 3,
        maxlength: 200 
    },
    content:{
        type:String,
        minlength: 50,

    },
    excerpt:{
        type:String,
        maxlength: 500,
    },
    status:{
        type:String,
        enum:['published','achived'],
        default:'published',
    },
    author:{
        type: ObjectId,
        ref:"User"
    },
    tags:{
        type:[ObjectId], //Va como un arreglo de objetos porque va a tener muchos tags.
        ref:"Tag"
    },
    createdAt:{
        type:Date
    },      
    updatedAt:{
        type:Date
    }        
});
const ArticleModel = model('Article', ArticleSchema)
export default ArticleModel;