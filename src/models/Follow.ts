import { model, Schema, SchemaTypes } from "mongoose";

export const FollowSchema = new Schema({
    followedBy: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    followedAt: {
        type: SchemaTypes.Date,
        required: true
    },
    followedUser: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    }, {timestamps: true})

export const FollowModel = model("Follow", FollowSchema);