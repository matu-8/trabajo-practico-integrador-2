import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { validator } from "../middleware/validator.js";
import { CreateUserValidation,
     CreateProfileValidator} from "../middleware/validations/user.validation.js";
import { loginUserValidation } from "../middleware/validations/login.validation.js";

export const AuthRoutes = Router();

AuthRoutes.post('/auth/register',
    CreateUserValidation ,
    CreateProfileValidator,
    validator,
    register)
AuthRoutes.post('/auth/login',
    loginUserValidation,
    validator,
    login)
// AuthRoutes.post('/auth/profile',  )
