import { Router } from "express";
import { updateUserValidation,
        getUserByIdValidation,
        deleteUserValidation } from "../middleware/validations/user.validator.js";

import {updateUser,
    getAllUser,
    getUserById,
    deleteUser
 } from "../controllers/user.controller.js";

export const UserRoutes = Router();

UserRoutes.get('/user', getAllUser)
UserRoutes.get('/user/:id', getUserByIdValidation, getUserById)
UserRoutes.put('/user/:id', updateUserValidation, updateUser)
UserRoutes.delete('/user/:id', deleteUserValidation, deleteUser)