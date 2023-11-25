import { model, Schema, SchemaTypes } from "mongoose";

const CommentSchema = new Schema({
  comment: {
    type: SchemaTypes.String,
    required: true,
  },
  commentedBy: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  commentedAt: {
    type: SchemaTypes.Date,
    required: true,
    default: Date.now,
  },
  designId: {
    type: String,
    ref: "Design",
    required: true,
  },
}, {timestamps: true})

export const CommentModel = model("Comment", CommentSchema);