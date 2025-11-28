import { Router } from "express";
import {
  updateUserValidation,
  getUserByIdValidation,
  deleteUserValidation,
} from "../middleware/validations/user.validation.js";

import {
  updateUser,
  getAllUser,
  getUserById,
  deleteUser,
} from "../controllers/user.controller.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const UserRoutes = Router();

UserRoutes.use(authMiddleware);

UserRoutes.get("/user", getAllUser);
UserRoutes.get("/user/:id", getUserByIdValidation, getUserById);
UserRoutes.put("/user/:id", updateUserValidation, updateUser);
UserRoutes.delete(
  "/user/:id",
  adminMiddleware,
  deleteUserValidation,
  deleteUser
);
