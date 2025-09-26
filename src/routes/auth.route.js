import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
import { validator } from "../middleware/validator.js";
import { CreateUserValidation,
     CreateProfileValidator} from "../middleware/validations/user.validator.js";

export const AuthRoutes = Router();

AuthRoutes.post('/auth',
    CreateUserValidation ,
    CreateProfileValidator,
    validator,
    register)
// AuthRoutes.post('/auth',)
// AuthRoutes.post('/auth',)
// AuthRoutes.post('/auth',)