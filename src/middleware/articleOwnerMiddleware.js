import ArticleModel from "../models/article.model.js";

export const articleOwnerMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;

    const article = await ArticleModel.findById(id);

    
    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

   
    const userId = req.user._id; 
    const userRole = req.user.role;

    
    if (article.author.toString() !== userId && userRole !== "admin") {
      return res.status(403).json({ 
        message: "No tienes permiso para modificar o eliminar este artículo" 
      });
    }

    next();

  } catch (error) {
    console.error("Error en articleOwnerMiddleware:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};