import { model, Schema, SchemaTypes } from "mongoose";

const LikeArtSchema = new Schema({
  likedBy: {
    type: String,
    ref: "User",
    required: true,
  },
  likedAt: {
    type: SchemaTypes.Date,
    required: true
  },
  artId: {
    type: String,
    ref: "Art",
    required: true,
  },
}, {timestamps: true})

export const LikeArtModel = model("LikeArt", LikeArtSchema);