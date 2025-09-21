import { body, param } from "express-validator";

export const createUserValidation = [
body("username")
    .notEmpty().withMessage("El campo debe ser completado")
    .isString()
    .trim()
    .isAlphanumeric().withMessage("El username deben ser solo letras y numeros")
    .isLength({min:2, max:30}).withMessage("El username no debe tener menos de 3 ni mas de 30 caracteres"),

body("email")
    .notEmpty().withMessage("El campo no puede estsa vacio")
    .trim()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .withMessage("El email debe ser un formato valido"),

body("password")
    .notEmpty().withMessage("El campo no puede ser vacio")
    .trim()
    .isAlphanumeric()
    .isString(),

body("role")
    .notEmpty().withMessage("El campo no puede ser vacio")
    .isString().withMessage("Este campo solo debe contener los valores por defecto (admin, user)"),

];

export const updateUserValidation = [
body("username")
    .optional()
    .isString()
    .trim()
    .isAlphanumeric().withMessage("El username deben ser solo letras y numeros")
    .isLength({min:2, max:30}).withMessage("El username no debe tener menos de 3 ni mas de 30 caracteres"),

body("email")
    .notEmpty().withMessage("El campo no puede estsa vacio")
    .trim()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .withMessage("El email debe ser un formato valido"),

body("password")
    .optional()
    .trim()
    .isAlphanumeric()
    .isString(),

body("role")
    .optional()
    .isString().withMessage("Este campo solo debe contener los valores por defecto (admin, user)"),

]