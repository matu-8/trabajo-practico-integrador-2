import { model, Schema } from "mongoose";

const TagSchema = new Schema({
    name:{
        type:String,
        unique:true,
        minlength: 2,
        maxlength: 30,

    },
    description:{
        type:String,
        maxlength:200
    },
},
{
    timestamps: true,
})

const TagModel = model('Tag', TagSchema)

export default TagModel;