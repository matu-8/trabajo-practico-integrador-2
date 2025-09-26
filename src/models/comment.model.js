import { model, Schema } from "mongoose";

//instancio el ObjectId
const ObjectId = Schema.Types.ObjectId

const CommentSchema = new Schema({
    content:{
        type:String,
        minlength: 5,
        maxlength: 500
    },
    author:{
        type:ObjectId,
        ref:"User"
    },
    article:{
        type:[ObjectId],
        ref:"Article"
    },
},
{
    timestamps: true
})

const CommentModel = model('Comment', CommentSchema)

export default CommentModel;