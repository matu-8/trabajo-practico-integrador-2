import { body, param } from "express-validator";
import ArticleModel from "../../models/article.model.js";

export const CreateArticleValidation = [
    body("title")
        .notEmpty().withMessage("El campo no debe ser vacio")
        .isString().withMessage("El Titulo debe sr una cadena de caracteres")
        .trim()
        .custom( async (value) => {
            const article = await ArticleModel.findOne({
                title:value
            })
            if(article){
                throw new Error(`El titulo del articulo ya existe`)
            }
            return true;
            }),
    
    body("content")
        .notEmpty().withMessage("El contenido es requerido")
        .trim()
        .isString().withMessage("El campo debe de ser una cadena de caracteres")
        .isLength({mix:50}).withMessage("El contenido debe tener como minimo 50 caracteres"),
    
    body("excerpt")
        .optional()
        .trim()
        .isString().withMessage("El extracto debe ser una cadena de caracteres")
        .isLength({max:500}).withMessage("El extracto no debe sobrepasar los 500 caracteres"),

    body("status")
            .notEmpty().withMessage("El estado es requerido")
            .isIn(["published","archived"]) //metodo para validar tipos de datos enum (valores posibles predefinidos)

]

export const UpdateArticleValidation = [
    param("id")
        .notEmpty().withMessage("El id es requerido")
        .isMongoId().withMessage("El id ingresado es invalido"),

    body("title")
        .optional()
        .isString().withMessage("El Titulo debe ser una cadena de caracteres")
        .trim()
        .custom( async (value, {param}) => {
            const article = await ArticleModel.findById({
                _id:{$ne:req.param._id}
            })
            if(article){
                throw new Error(`El titulo del articulo ya existe`)
            }
            return true;
            }),

    body("content")
        .optional()
        .trim()
        .isString().withMessage("El campo debe de ser una cadena de caracteres")
        .isLength({mix:50}).withMessage("El contenido debe tener como minimo 50 caracteres"),
    
    body("excerpt")
        .optional()
        .trim()
        .isString().withMessage("El extracto debe ser una cadena de caracteres")
        .isLength({max:500}).withMessage("El extracto no debe sobrepasar los 500 caracteres"),

    body("status")
        .notEmpty().withMessage("El estado es requerido")
        .isIn(["published","archived"]) //metodo para validar tipos de datos enum (valores posibles predefinidos)
]

export const getArticleByIdValidation = [
    param("id")
        .notEmpty().withMessage("Debe ingresar un id")
        .isMongoId().withMessage("Debe ingresar un objectId valido de mongoDB")
        .custom(async value => {
            const article = await ArticleModel.findById(value)
            if(!article){
                throw new Error("No se ha encontrado el articulo especificado")
            }
            return true
        })
]
export const deleteArticleValidation= [
    param("id")
        .notEmpty().withMessage("Debe ingresar un id")
        .isMongoId().withMessage("Debe ingresar un objectId valido de mongoDB")
        .custom(async value => {
            const article = await ArticleModel.findById(value)
            if(!article){
                throw new Error("No se ha encontrado el articulo especificado")
            }
            return true
        }),
    ]
    
