import { Router } from "express";
import {
  createComment,
  deleteComment,
  getAllComments,
  getMyComments,
  updateComment,
} from "../controllers/comment.controller.js";
import {
  createCommentValidation,
  updateCommentValidation,
} from "../middleware/validations/comment.validation.js";
import {
  mongoIdValidator,
  validator,
} from "../middleware/validator.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { isCommentOwner } from "../middleware/isCommentOwner.js"; 

const commentRouter = Router();

commentRouter.post(
  "/comments",
  authMiddleware,
  createCommentValidation,
  validator,
  createComment
);

commentRouter.get("/articles/:articleId", authMiddleware, getAllComments);

commentRouter.get("/my", authMiddleware, getMyComments);

commentRouter.put(
  "/:id",
  authMiddleware,
  mongoIdValidator, 
  validator,        
  isCommentOwner,   
  updateCommentValidation,
  validator,
  updateComment
);

commentRouter.delete(
  "/:id",
  authMiddleware,
  mongoIdValidator, 
  validator,       
  isCommentOwner,   
  deleteComment
);

export default commentRouter;