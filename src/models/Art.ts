import { model, Schema } from "mongoose";

const ArtSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    artImages: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      enum: [
        "painting",
        "oil painting",
        "sculpture",
        "landscape",
      ],
      default: "painting",
    },
    dimensions: {
      type: String,
      required: true,
    },
    artState: {
      type: String,
      enum: ["onSale", "auction", "sold", "showcase"],
      default: "onSale",
    },
    price: {
      type: Number,
      required: function () {
        return this.artState === "onSale";
      }
    },
    auctionEndDate: {
      type: Date,
      required: false
    },
    auctionStartDate: {
      type: Date,
      required: function () {
        return this.artState === "auction";
      },
    },
    auctionStartPrice: {
      type: Number,
      required: function () {
        return this.artState === "auction";
      },
    },
    highestBid: {
      type: Number,
      default: function () {
        return this.auctionStartPrice;
      },
      required: false
    },
    auctionWinner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false
    },
  },
  { timestamps: true }
);

export const ArtModel = model("Art", ArtSchema);
