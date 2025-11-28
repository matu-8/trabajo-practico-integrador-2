import { Router } from "express";
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
} from "../controllers/article.controller.js";
import {
  CreateArticleValidation,
  UpdateArticleValidation,
} from "../middleware/validations/article.validation.js";
import { mongoIdValidator, validator } from "../middleware/validator.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { articleOwnerMiddleware } from "../middleware/articleOwnerMiddleware.js";
import {
  addTagToArticle,
  removeTagFromArticle,
} from "../controllers/articleTag.controller.js";
// import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { adminOrOwnerMiddleware } from "../middleware/adminOrownerMiddleware";

const articleRouter = Router();

articleRouter.post(
  "/",
  authMiddleware,
  CreateArticleValidation,
  validator,
  createArticle
);

articleRouter.get("/", getAllArticles);

articleRouter.get("/:id", mongoIdValidator, validator, getArticleById);

articleRouter.put(
  "/:id",
  authMiddleware,
  mongoIdValidator,
  validator,
  articleOwnerMiddleware,
  UpdateArticleValidation,
  validator,
  updateArticle
);

articleRouter.delete(
  "/:id",
  authMiddleware,
  mongoIdValidator,
  validator,
  articleOwnerMiddleware,
  deleteArticle
);
//Rutas para agregar o eliminar etiquetas de un articulo
articleRouter.post(
  "/:articleId/tags/:tagId",
  authMiddleware,
  adminOrOwnerMiddleware,
  addTagToArticle
);
articleRouter.delete(
  "/:articleId/tags/:tagId",
  authMiddleware,
  adminOrOwnerMiddleware,
  removeTagFromArticle
);

export default articleRouter;
