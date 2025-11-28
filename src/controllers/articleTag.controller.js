import ArticleModel from "../models/article.model.js";
import TagModel from "../models/tag.model.js";

// POST /api/articles/:articleId/tags/:tagId → Agregar etiqueta a artículo
export const addTagToArticle = async (req, res) => {
  try {
    const { articleId, tagId } = req.params;

    // Verificao que el artículo existe
    const article = await ArticleModel.findById(articleId);
    if (!article) {
      return res.status(404).json({
        ok: false,
        msg: "Artículo no encontrado"
      });
    }

    // Verifico que el tag existe
    const tag = await TagModel.findById(tagId);
    if (!tag) {
      return res.status(404).json({
        ok: false,
        msg: "Tag no encontrado"
      });
    }

    // Verifico si el tag ya está agregado
    if (article.tags.includes(tagId)) {
      return res.status(400).json({
        ok: false,
        msg: "El tag ya está asociado a este artículo"
      });
    }

    // Agrego el tag al artículo
    article.tags.push(tagId);
    await article.save();

    res.status(200).json({
      ok: true,
      msg: "Tag agregado al artículo exitosamente",
      article
    });

  } catch (error) {
    console.error("Error al agregar tag:", error);
    res.status(500).json({
      ok: false,
      msg: "Error interno del servidor"
    });
  }
};

// DELETE /api/articles/:articleId/tags/:tagId → Remover etiqueta de artículo
export const removeTagFromArticle = async (req, res) => {
  try {
    const { articleId, tagId } = req.params;

    // Verifico que el artículo existe
    const article = await ArticleModel.findById(articleId);
    if (!article) {
      return res.status(404).json({
        ok: false,
        msg: "Artículo no encontrado"
      });
    }

    // Verifico si el tag está en el artículo
    if (!article.tags.includes(tagId)) {
      return res.status(400).json({
        ok: false,
        msg: "El tag no está asociado a este artículo"
      });
    }

    // Remuevo el tag usando $pull
    article.tags = article.tags.filter(tag => tag.toString() !== tagId);
    await article.save();

    res.status(200).json({
      ok: true,
      msg: "Tag removido del artículo exitosamente",
      article
    });

  } catch (error) {
    console.error("Error al remover tag:", error);
    res.status(500).json({
      ok: false,
      msg: "Error interno del servidor"
    });
  }
};