import { model, Schema, SchemaTypes } from "mongoose";

const LikeSchema = new Schema({
  likedBy: {
    type: String,
    ref: "User",
    required: true,
  },
  likedAt: {
    type: SchemaTypes.Date,
    required: true
  },
  designId: {
    type: String,
    ref: "Design",
    required: true,
  },
}, {timestamps: true})