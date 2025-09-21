import { body, param } from "express-validator";
import { isLength } from "validator";

export const createUserValidation = [
body("username")
.notEmpty().withMessage("El campo debe ser completado")
.isString()
.trim()
.isAlphanumeric().withMessage("El username deben ser solo letras y numeros")
.isLength({min:2, max:30}).withMessage("El username no debe tener menos de 3 ni mas de 30 caracteres"),

body("email")
]