import { Schema, model, Types } from "mongoose";

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: Types.ObjectId,
    ref: "Post",
    required: true,
  }
}, {
  timestamps: true,
  versionKey: false,
});

const commentModel = model("Comment", commentSchema);
export default commentModel;
