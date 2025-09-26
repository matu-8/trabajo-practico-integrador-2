import { matchedData } from "express-validator";
import ArticleModel from "../models/article.model.js";


export const getAllArticles = async(req, res)=>{
    try {
        const articles = await ArticleModel.find().populate()
        if(articles.length === 0)
            return res.status(404).json({
                ok:false,
                msg:"No se han encontrado articulos"
        });
       return res.status(200).json({
                ok:false,
                msg:"Se han encontrado estos articulos"
        });
        
    } catch (error) {
        console.log(`>>>! ha ocurrido un error en metodo get (todos los articulos) ${error}`)
        return res.status(500).json({
            ok:false,
            msg:`Error interno de servidor`
        })
    }
};

export const updateArticle = async(req, res)=>{
    const {id} = req.params;
    try {
        const validatedData = matchedData(req) 
        const updatedArticle = await ArticleModel.findByIdAndUpdate(id, validatedData, {new:true})
            if(updatedArticle){
                return res.status(200).json({
                    ok:true,
                    msg:"Se ha actualizado el articulo",
                    user
                })
            }
            return res.status(404).json({
                ok:false,
                msg:"No se ha encontrado el articulo"
            })
    } catch (error) {
        console.log(`>>>! ha ocurrido un error en metodo put (articulo) ${error}`)
        return res.status(500).json({msg:`Error interno de servidor`})
    }
};

export const createArticle = async(req, res)=>{
    try {
        const validatedData = matchedData(req)
        const article = await ArticleModel.create(matchedData, validatedData)
        return res.status(201).json({
            ok:true,
            msg:"Se ha creado el article",
            article
        })
    } catch (error) {
      console.log(`>>>! ha ocurrido un error en metodo post (article) ${error}`)
        return res.status(500).json({
            ok:false,
            msg:`Error interno de servidor`
        })  
    } 
};

export const getArticleById = async(req, res) => {
    try {
        const {id} = req.params;
        const article = await ArticleModel.findById(id)
        return res.status(200).json({
            ok:true,
            msg:"Se ha encontrado el articulo",
            article
        })
        
    } catch (error) {
        console.log(`>>>! ha ocurrido un error en metodo get (articulo por id) ${error}`)
        return res.status(500).json({
            ok:false,
            msg:`Error interno de servidor`
        })
    }
};

export const deleteArticle = async(req, res) => {
try {
    const {id} = req.params;
    const deletedArticle = await ArticleModel.findByIdAndDelete(id)
    return res.status(200).json({
        ok:true,
        
    })

} catch (error) {
    onsole.log(`>>>! ha ocurrido un error en metodo delete (usuario) ${error}`)
        return res.status(500).json({
            ok:false,
            msg:`Error interno de servidor`
        })
}
}