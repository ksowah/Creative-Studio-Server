import { model, Schema, SchemaTypes } from "mongoose";

const NotificationSchema = new Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    notificationType: {
      type: String,
      enum: [
        "bidPlaced",
        "newBid",
        "bidOutbid",
        "newFollower",
        "newOrder",
        "orderConfirmed",
        "generic",
      ],
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    artWorks: {
      type: [SchemaTypes.ObjectId],
      ref: "Art",
      required: function () {
        return (
          this.notificationType === "bidPlaced" ||
          this.notificationType === "bidOutbid" ||
          this.notificationType === "orderConfirmed" ||
          this.notificationType === "newOrder" ||
          this.notificationType === "newBid"
        );
      },
    },
  },
  { timestamps: true }
);

export const NotificationModel = model("Notification", NotificationSchema);
