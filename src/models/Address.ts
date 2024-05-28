import { model, Schema } from "mongoose";

const AddressSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    houseNumber: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
}, {timestamps: true})

export const AddressModel = model("Address", AddressSchema);