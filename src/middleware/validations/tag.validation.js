import { body, param } from "express-validator";
import TagModel from "../../models/tag.model.js";

export const createTagValidation = [
  body("name")
    .notEmpty()
    .isString()
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre del tag debe tener entre 2 y 30 caracteres")
    .custom(async (value) => {
      const tag = await TagModel.findOne({ name: value });
      if (tag) {
        throw new Error("El nombre del tag ya existe");
      }
      return true;
    }),
  body("description")
    .optional()
    .isString()
    .isLength({ max: 200 })
    .withMessage("La descripción no puede superar los 200 caracteres"),
];

export const updateTagValidation = [
  param("id")
    .notEmpty()
    .isMongoId()
    .withMessage("El ID es invalido")
    .custom(async (value) => {
      const tag = await TagModel.findById(value);
      if (!tag) {
        throw new Error("El tag no existe");
      }
      return true;
    }),
  body("name")
    .optional()
    .isString()
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre del tag debe tener entre 2 y 30 caracteres")
    .custom(async (value, { req }) => {
      const exists = await TagModel.findOne({
        name: value,
        _id: { $ne: req.params.id },
      });
      if (exists) {
        throw new Error("El nombre del tag ya está en uso");
      }
      return true;
    }),
  body("description")
    .optional()
    .isString()
    .isLength({ max: 200 })
    .withMessage("La descripción no puede superar los 200 caracteres"),
];