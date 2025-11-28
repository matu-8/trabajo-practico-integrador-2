import { body, param } from "express-validator";
import UserModel from "../../models/user.model.js";
import ArticleModel from "../../models/article.model.js";
import CommentModel from "../../models/comment.model.js";

export const createCommentValidation = [
  body("content")
    .notEmpty()
    .withMessage("El contenido no puede estar vacío")
    .isString()
    .isLength({ min: 5, max: 500 })
    .withMessage("El comentario debe tener entre 5 y 500 caracteres"),
  body("author")
    .notEmpty()
    .withMessage("Debe indicar un autor")
    .isMongoId()
    .withMessage("El ID de autor no es válido")
    .custom(async (value) => {
      const user = await UserModel.findById(value);
      if (!user) {
        throw new Error("El autor no existe");
      }
      return true;
    }),
  body("article")
    .notEmpty()
    .withMessage("Debe indicar un artículo")
    .isMongoId()
    .withMessage("El ID de artículo no es válido")
    .custom(async (value) => {
      const article = await ArticleModel.findById(value);
      if (!article) {
        throw new Error("El artículo no existe");
      }
      return true;
    }),
];

export const updateCommentValidation = [
  param("id")
    .notEmpty()
    .isMongoId()
    .withMessage("Debe enviar un ID válido de comentario")
    .custom(async (value) => {
      const comment = await CommentModel.findById(value);
      if (!comment) {
        throw new Error("El comentario no existe");
      }
      return true;
    }),
  body("content")
    .optional()
    .isString()
    .isLength({ min: 5, max: 500 })
    .withMessage("El comentario debe tener entre 5 y 500 caracteres"),
  body("author")
    .optional()
    .isMongoId()
    .withMessage("El ID de autor no es válido")
    .custom(async (value) => {
      const user = await UserModel.findById(value);
      if (!user) {
        throw new Error("El autor no existe");
      }
      return true;
    }),
  body("article")
    .optional()
    .isMongoId()
    .withMessage("El ID de artículo no es válido")
    .custom(async (value) => {
      const article = await ArticleModel.findById(value);
      if (!article) {
        throw new Error("El artículo no existe");
      }
      return true;
    }),
];