import ArticleModel from "../models/article.model.js"; 

export const articleOwnerMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;

    const article = await ArticleModel.findById(id);

    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    const userId = req.user.id || req.user._id; 
    const userRole = req.user.role;

    const isOwner = article.author.toString() === userId.toString();
    const isAdmin = userRole === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ 
        message: "No tienes permisos para modificar o eliminar este artículo" 
      });
    }


    next();
  } catch (error) {
    return res.status(500).json({ message: "Error al verificar la propiedad del artículo" });
  }
};