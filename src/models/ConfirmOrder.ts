import { model, Schema, SchemaTypes } from "mongoose";

const ConfirmOrderSchema = new Schema({
  user: {
    type: String,
    ref: "User",
    required: true,
  },
  items: {
    type: [String],
    required: true,
  },
  
}, {timestamps: true})

export const ConfirmOrderModel = model("ConfirmOrder", ConfirmOrderSchema);