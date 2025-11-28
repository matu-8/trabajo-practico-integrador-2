import { param } from "express-validator";
import ArticleModel from "../../models/article.model.js";
import TagModel from "../../models/tag.model.js";

export const addTagValidation = [
  param("articleId")
    .notEmpty()
    .isMongoId()
    .withMessage("Debe enviar un ID válido de artículo")
    .custom(async (value) => {
      const article = await ArticleModel.findById(value);
      if (!article) {
        throw new Error("El artículo no existe");
      }
      return true;
    }),

  param("tagId")
    .notEmpty()
    .isMongoId()
    .withMessage("Debe enviar un ID válido de tag")
    .custom(async (value) => {
      const tag = await TagModel.findById(value);
      if (!tag) {
        throw new Error("El tag no existe");
      }
      return true;
    }),
];

export const removeTagValidation = [
  param("articleId")
    .notEmpty()
    .isMongoId()
    .withMessage("Debe enviar un ID válido de artículo")
    .custom(async (value) => {
      const article = await ArticleModel.findById(value);
      if (!article) {
        throw new Error("El artículo no existe");
      }
      return true;
    }),
  param("tagId")
    .notEmpty()
    .isMongoId()
    .withMessage("Debe enviar un ID válido de tag")
    .custom(async (value) => {
      const tag = await TagModel.findById(value);
      if (!tag) {
        throw new Error("El tag no existe");
      }
      return true;
    }),
];