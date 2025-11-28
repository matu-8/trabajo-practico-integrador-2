import { matchedData } from "express-validator";
import ArticleModel from "../models/article.model.js";

export const createArticle = async(req, res)=>{
    try {
        const validatedData = matchedData(req);

        console.log(req.user._id )
        
        const dataToSave = {
            ...validatedData,
            author: req.user._id 
        };

        const article = await ArticleModel.create(dataToSave);
        
        return res.status(201).json({
            ok: true,
            msg: "Se ha creado el artículo",
            article
        });
    } catch (error) {
        console.log(`>>>! Error en post article: ${error}`);
        return res.status(500).json({
            ok: false,
            msg: "Error interno de servidor"
        });  
    } 
};

export const getAllArticles = async(req, res)=>{
    try {
        const articles = await ArticleModel.find().populate("author", "username email");
        
        if(articles.length === 0)
            return res.status(404).json({
                ok: false,
                msg: "No se han encontrado artículos"
        });

        return res.status(200).json({
                ok: true,
                msg: "Se han encontrado estos artículos",
                articles
        });
        
    } catch (error) {
        console.log(`>>>! Error en get all: ${error}`);
        return res.status(500).json({
            ok: false,
            msg: "Error interno de servidor"
        });
    }
};

export const updateArticle = async(req, res)=>{
    const {id} = req.params;
    try {
        const validatedData = matchedData(req);
        const updatedArticle = await ArticleModel.findByIdAndUpdate(id, validatedData, {new: true});
        
        if(updatedArticle){
            return res.status(200).json({
                ok: true,
                msg: "Se ha actualizado el artículo",
                article: updatedArticle 
            });
        }
        return res.status(404).json({
            ok: false,
            msg: "No se ha encontrado el artículo"
        });
    } catch (error) {
        console.log(`>>>! Error en update: ${error}`);
        return res.status(500).json({msg: "Error interno de servidor"});
    }
};

export const getArticleById = async(req, res) => {
    try {
        const {id} = req.params;
        const article = await ArticleModel.findById(id).populate("author", "username"); 
        if (!article) { // Corrección: Validar si es null
            return res.status(404).json({
                ok: false,
                msg: "Artículo no encontrado"
            });
        }

        return res.status(200).json({
            ok: true,
            msg: "Se ha encontrado el artículo",
            article
        });
        
    } catch (error) {
        console.log(`>>>! Error en get by id: ${error}`);
        return res.status(500).json({
            ok: false,
            msg: "Error interno de servidor"
        });
    }
};

export const deleteArticle = async(req, res) => {
    try {
        const {id} = req.params;
        const deletedArticle = await ArticleModel.findByIdAndDelete(id);

        if (!deletedArticle) {
            return res.status(404).json({
                ok: false,
                msg: "Artículo no encontrado"
            });
        }

        return res.status(200).json({
            ok: true,
            msg: "Artículo eliminado correctamente"
        });

    } catch (error) {
        console.log(`>>>! Error en delete: ${error}`); 
        return res.status(500).json({
            ok: false,
            msg: "Error interno de servidor"
        });
    }
};