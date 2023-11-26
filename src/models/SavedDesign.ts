import { model, Schema, SchemaTypes } from "mongoose";

const SavedDesignSchema = new Schema({
  savedBy: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  savedAt: {
    type: SchemaTypes.Date,
    required: true
  },
  design: {
    type: SchemaTypes.ObjectId,
    ref: "Design",
    required: true,
  },
}, {timestamps: true})

export const SavedDesignModel = model("SavedDesign", SavedDesignSchema);