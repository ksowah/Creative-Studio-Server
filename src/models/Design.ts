import { model, Schema, SchemaTypes } from "mongoose";

const DesignSchema = new Schema({
  designer: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    require: true,
  },
  preview: {
    type: String,
    require: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  saves: {
    type: Number,
    default: 0,
  },
  description: String,
  designSubscription: {
    type: String,
    enum: ["FREE", "PAID"],
    default: "FREE",
  },
  designFiles: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Schema.Types.Date,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  category: {
    type: String,
    enum: [
      "UI/UX",
      "Web",
      "Mobile",
      "Illustration",
      "3D",
      "Animation",
      "Branding",
      "Graphic Design",
      "Product Design",
      "Typography",
      "Photography",
    ],
    default: "UI/UX",
  },
});

export const DesignModel = model("Design", DesignSchema);
