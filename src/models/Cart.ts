import { model, Schema, SchemaTypes } from "mongoose";

const CartSchema = new Schema(
  {
    item: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "Art"
    },

    user: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },

    artist: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "User",
    }
  },
  { timestamps: true }
);

export const CartModel = model("Cart", CartSchema);
