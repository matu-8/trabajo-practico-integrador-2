import TagModel from "../models/tag.model.js";
import { matchedData } from "express-validator";

export const createTag = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    await TagModel.create(data);

    res.status(201).json({
      ok: true,
      message: "Etiqueta creada",
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      error: e.message,
    });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const tags = await TagModel.find().select("name description").lean();

    res.status(200).json({
      ok: true,
      tags: tags,
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      error: e.message,
    });
  }
};

export const getTagById = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await TagModel.findById(id).populate(
      "Articles",
      "title content excerpt status author -tags",
    );

    if (!tag) {
      return res.status(404).json({
        ok: false,
        message: "No existe esa etiqueta",
      });
    }

    res.status(200).json({
      ok: true,
      tag: tag,
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      error: e.message,
    });
  }
};

export const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const data = matchedData(req, { locations: ["body"] });

    const tagUpdated = await TagModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      tag: tagUpdated,
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      error: e.message,
    });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await TagModel.findOneAndDelete({ _id: id });

    if (!tag) {
      return res.status(404).json({
        ok: false,
        message: "La etiqueta no existe",
      });
    }

    res.status(200).json({
      ok: true,
      message: "La etiqueta se borro con exito",
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      error: e.message,
    });
  }
};