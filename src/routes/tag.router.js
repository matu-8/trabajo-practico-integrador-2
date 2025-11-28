import { Router } from "express";
import {
  createTag,
  deleteTag,
  getAllTags,
  getTagById,
  updateTag,
} from "../controllers/tag.controller.js";
import {
  createTagValidation,
  updateTagValidation,
} from "../middleware/validations/tag.validation.js";
import {
  mongoIdValidator,
  validator,
} from "../middleware/validations/validator.js";
import { authenticate } from "../middleware/auth.middleware.js";

import { adminMiddleware } from "../middleware/adminMiddleware.js";

const tagRouter = Router();


tagRouter.post(
  "/",
  authenticate,
  adminMiddleware,
  createTagValidation,
  validator,
  createTag
);


tagRouter.get("/", authenticate, getAllTags);

tagRouter.get(
  "/:id",
  authenticate,
  mongoIdValidator, 
  validator,        
  getTagById
);

tagRouter.put(
  "/:id",
  authenticate,
  mongoIdValidator, 
  validator,        
  adminMiddleware,  
  updateTagValidation, 
  validator,           
  updateTag
);

tagRouter.delete(
  "/:id",
  authenticate,
  mongoIdValidator, 
  validator,
  adminMiddleware,
  deleteTag
);

export default tagRouter;