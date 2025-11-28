import { body } from "express-validator";

export const loginUserValidation = [
   body("username")
    .notEmpty().withMessage("El campo es requerido")
    .isString().withMessage("El campo debe tener solo una cadena de caracteres")
    .trim()
    .isAlphanumeric().withMessage("El username deben ser solo letras y numeros")
    .isLength({min:2, max:30}).withMessage("El username no debe tener menos de 3 ni mas de 30 caracteres"),

    body("password")
    .notEmpty().withMessage("El campo no puede ser vacio")
    .trim()
    .isAlphanumeric()
    .isString(),
]