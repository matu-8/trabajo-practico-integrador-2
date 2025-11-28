import CommentModel from "../models/comment.model.js";

export const isCommentOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await CommentModel.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    const userId = req.user._id; 
    const userRole = req.user.role;

    if (comment.author.toString() !== userId && userRole !== "admin") {
      return res.status(403).json({ message: "No eres el dueño de este comentario" });
    }

    next();

  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};