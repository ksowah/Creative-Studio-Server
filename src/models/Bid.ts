import { model, Schema } from "mongoose";

const BidSchema = new Schema({
    bidBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bidAt: {
        type: Date,
        required: true
    },
    bidAmount: {
        type: Number,
        required: true
    },
    artId: {
        type: Schema.Types.ObjectId,
        ref: "Art",
        required: true
    }
}, {timestamps: true})

export const BidModel = model("Bid", BidSchema);