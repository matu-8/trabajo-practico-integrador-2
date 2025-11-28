import { Schema, model } from "mongoose";
import ArticleModel from "./article.model.js";

const TagSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      minLength: 2,
      maxLength: 30,
    },
    description: {
      type: String,
      maxLength: 200,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

TagSchema.pre("findOneAndDelete", async function (next) {
  const tag = await this.model.findOne(this.getFilter());

  if (tag)
    await ArticleModel.updateMany(
      { tag: tag._id },
      { $pull: { tag: tag._id } },
    );

  next();
});

TagSchema.virtual("Articles", {
  ref: "Article",
  localField: "_id",
  foreignField: "tags",
});

TagSchema.set("toJSON", { virtuals: true });

const TagModel = model("Tag", TagSchema);

export default TagModel;