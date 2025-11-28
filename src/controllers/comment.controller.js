import { matchedData } from "express-validator";
import ArticleModel from "../models/article.model.js";
import CommentModel from "../models/comment.model.js";

export const createComment = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    await CommentModel.create(data);

    res.status(201).json({
      ok: true,
      message: "Comentario creado",
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      error: e.message,
    });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const { articleId } = req.params;

    const comments = await CommentModel.find({ article: articleId })
      .populate("author", "username profile")
      .select("content");

    res.status(200).json({
      ok: true,
      comments: comments,
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      error: e.message,
    });
  }
};

export const getMyComments = async (req, res) => {
  try {
    const { id } = req.body;

    const comments = await CommentModel.find({ author: id }).select("content");

    res.status(200).json({
      ok: true,
      data: comments,
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      error: e.message,
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const data = matchedData(req, { locations: ["body"] });

    const commentUpdated = await CommentModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!commentUpdated) {
      return res.status(404).json({
        ok: false,
        message: "El comentario no existe",
      });
    }

    res.status(200).json({
      ok: true,
      data: commentUpdated,
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      error: e.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await CommentModel.findOneAndDelete({ _id: id });

    if (!comment) {
      return res.status(404).json({
        ok: false,
        message: "El comentario no existe",
      });
    }

    res.status(200).json({
      ok: true,
      message: "El comentario se borro con exito",
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      error: e.message,
    });
  }
};