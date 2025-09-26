import { Schema, model } from "mongoose";
import CommentModel from "./comment.model.js";

const ObjectId = Schema.Types.ObjectId 

const ArticleSchema = new Schema({
    title:{
        type: String,
        minlength: 3,
        maxlength: 200,
        unique:true
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
        type:[ObjectId], //Va como un arreglo de objetos porque posee muchas tarjetas.
        ref:"Tag"
    },       
},
{
    timestamps:true
});
//Eliminacion de articulo con sus comentarios
ArticleSchema.pre("findOneAndDelete", async function(next){ //Para la funcion de "findOneAndDelete", para eliminar un articulo
                                                            //agrego un "gancho", que se va a ejecutar antes de eliminarlo.
    const article = await this.model.findOne(this.getFilter()) // 

    if(article){
        await CommentModel.deleteMany({article : article._id})
    }
    next();
})
const ArticleModel = model('Article', ArticleSchema)
export default ArticleModel;