import { body, param } from "express-validator";
import UserModel from "../../models/user.model.js";

export const CreateUserValidation = [
body("username")
    .notEmpty().withMessage("El campo es requerido")
    .isString().withMessage("El campo debe tener solo una cadena de caracteres")
    .trim()
    .isAlphanumeric().withMessage("El username deben ser solo letras y numeros")
    .isLength({min:2, max:30}).withMessage("El username no debe tener menos de 3 ni mas de 30 caracteres")
    .custom(async value => {
        const user = await UserModel.findOne({username:value})
        console.log(user)
        if(user){
            throw new Error("Ya existe un usuario con el nombre ingresado")
        }
        return true;
    }),

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
    .isString()
    .isIn(["admin","user"]).withMessage("Este campo solo debe contener los valores por defecto (admin, user)"),
]

export const updateUserValidation = [
body("username")
    .optional()
    .isString()
    .trim()
    .matches(/^[a-zA-Z0-9]+$/)
    .isAlphanumeric().withMessage("El username deben ser solo letras y numeros")
    .isLength({min:2, max:30}).withMessage("El username no debe tener menos de 3 ni mas de 30 caracteres"),

body("email")
    .optional()
    .trim()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .withMessage("El email debe ser un formato valido"),

body("password")
    .optional()
    .trim()
    .isAlphanumeric()
    .matches(/^[a-zA-Z0-9]+$/)
    .isString(),

body("role")
    .optional()
    .isString()
    .isIn(["admin","user"]).withMessage("Este campo solo debe contener los valores por defecto (admin, user)"),
]

export const getUserByIdValidation = [
    param("id")
        .notEmpty().withMessage("Debe ingresar un id")
        .isMongoId().withMessage("Debe ingresar un objectId valido de mongoDB")
        .custom(async value => {
            const user = await UserModel.findById(value)
            if(!user){
                throw new Error("No se ha encontrado el usuario especificado")
            }
            return true
        })
]

export const deleteUserValidation = [
    param("id")
        .notEmpty().withMessage("Debe ingresar un id")
        .isMongoId().withMessage("Debe ingresar un objectId valido de mongoDB")
        .custom(async value => {
            const user = await UserModel.findById(value)
            if(!user){
                throw new Error("No se ha encontrado el usuario para eliminar")
            }
            return true
        })
]

//Validaciones de perfil

export const CreateProfileValidator = [
    body('profile.firstName')
        .notEmpty().withMessage("El primer nombre es requerido")
        .trim()
        .isLength({min:2, max:50})
        .isString().withMessage("El nombre y apellido deben ser solo una cadena de caracteres")
        .matches(/^[a-zA-Z]+$/).withMessage("El nombre y apellido solo deben contener letras "),
    body('profile.lastName')
        .notEmpty().withMessage("El apellido nombre es requerido")
        .trim()
        .isString().withMessage("El nombre y apellido deben ser solo una cadena de caracteres")
        .matches(/^[a-zA-Z]+$/).withMessage("El nombre y apellido solo deben contener letras "),
    body('profile.biography')
        .notEmpty().withMessage("Ingrese una biografia")
        .trim()
        .isString().withMessage("La biografia solo debe ser una cadena de caracteres")
        .isLength({max:500}).withMessage("La biografia no debe sobrepasar los 500 caracteres"),
    body('profile.avatarUrl')
        .optional()
        .isURL().withMessage("La URL ingresada es invalida"),
    body('profile.birthDate')
        .optional()
        .isDate().withMessage("El formato de la fecha es invalido")
]

export const UpdateProfileValidation= [
     body('profile.firstName')
        .optional() 
        .trim()
        .isString().withMessage("El nombre y apellido deben ser solo una cadena de caracteres")
        .matches(/^[a-zA-Z]+$/).withMessage("El nombre y apellido solo deben contener letras "),
    body('profile.lastName')
        .optional()
        .trim()
        .isString().withMessage("El nombre y apellido deben ser solo una cadena de caracteres")
        .matches(/^[a-zA-Z]+$/).withMessage("El nombre y apellido solo deben contener letras "),
    body('profile.biography')
        .optional()
        .trim()
        .isString().withMessage("La biografia solo deb ser una cadena de caracteres")
        .isLength({max:500}).withMessage("La biografia no debe sobrepasar los 500 caracteres "),
    body('profile.avatarUrl')
        .optional()
        .isURL().withMessage("La URL ingresada es invalida"),
    body('profile.birthDate')
        .optional()
        .isDate().withMessage("El formato de la fecha es invalido")
]

export const getProfileByIdValidation = [
    param("id")
        .notEmpty().withMessage("Debe ingresar un id")
        .isMongoId().withMessage("Debe ingresar un objectId valido de mongoDB")
        .custom(async value => {
            const profile = await UserModel.findById(value)
            if(!profile){
                throw new Error("No se ha encontrado el perfil especificado")
            }
            return true
        })
]
