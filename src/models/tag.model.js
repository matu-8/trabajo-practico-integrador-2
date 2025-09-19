import { model, Schema } from "mongoose";

const TagSchema = new Schema({
    name:{
        type:String,
        unique:true
    },
    description:{
        type:String,
    },
    createdAt:{
        type:Date
    },
    updatedAt:{
        type:Date
    },
})

const TagModel = model('Tag', TagSchema)

export default TagModel;