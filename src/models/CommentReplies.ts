import { model, Schema, SchemaTypes } from "mongoose";

const CommentRepliesSchema = new Schema({
  reply: {
    type: SchemaTypes.String,
    required: true,
  },
  repliedBy: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  repliedAt: {
    type: SchemaTypes.Date,
    required: true,
    default: Date.now,
  },
  commentId: {
    type: String,
    ref: "Design",
    required: true,
  },
}, {timestamps: true})

export const CommentRepliesModel = model("Replies", CommentRepliesSchema);