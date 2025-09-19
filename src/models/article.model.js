import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId 

const ArticleSchema = new Schema({
    title:{
        type: String
    },
    content:{
        type:String
    },
    excerpt:{
        type:String
    },
    status:{
        type:String,
        enum:['published','achived'],
        default:'published'
    },
    author:{
        type: ObjectId,
    },
    tags:{
        type:[ObjectId],
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