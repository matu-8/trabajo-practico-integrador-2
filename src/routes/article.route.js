import { Router } from "express";
import { CreateArticleValidation,
        UpdateArticleValidation,
        getArticleByIdValidation,
        deleteArticleValidation,
 } from "../middleware/validations/article.validator.js";
 
import { createArticle,
    updateArticle,
    getAllArticles,
    getArticleById,
    deleteArticle
 } from "../controllers/article.controller.js";

export const ArticleRoutes = Router();

ArticleRoutes.get('/article', getAllArticles)
ArticleRoutes.get('/article/:id', 
    getArticleByIdValidation,
    getArticleById,
)
ArticleRoutes.post('/artilce', 
    CreateArticleValidation,
     createArticle,)

ArticleRoutes.put('/article/:id',
    UpdateArticleValidation,
    updateArticle,
)
ArticleRoutes.delete('/article/:id', deleteArticleValidation, deleteArticle)