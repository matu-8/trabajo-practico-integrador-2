import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      minLength: 5,
      maxLength: 500,
    },
    author: {
      type: ObjectId,
      ref: "User",
    },
    article: {
      type: ObjectId,
      ref: "Article",
    },
  },
  {
    timestamps: true,
  },
);

const CommentModel = model("Comment", CommentSchema);

export default CommentModel;