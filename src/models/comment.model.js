import { model, Schema } from "mongoose";

//instancio el ObjectId
const ObjectId = Schema.Types.ObjectId

const CommentSchema = new Schema({
    content:{
        type:String,
    },
    author:{
        type:ObjectId
    },
    article:{
        type:ObjectId
    },
    createdAt:{
        type:Date
    },
    updatedAt:{
        type:Date
    },
})

const CommentModel = model('Comment', CommentSchema)

export default CommentModel;