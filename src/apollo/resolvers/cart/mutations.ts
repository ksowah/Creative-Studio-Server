import Authenticate from "../../../middleware/auth";
import { ArtModel } from "../../../models/Art";
import { CartModel } from "../../../models/Cart";
import { ConfirmOrderModel } from "../../../models/ConfirmOrder";
import { NotificationModel } from "../../../models/Notifications";

export const addToCart = async (
  _: any,
  { itemId, artist }: any,
  context: any
) => {
  try {
    const user: any = Authenticate(context);

    const itemAlreadyInCart = await CartModel.findOne({
      item: itemId,
      user: user.user._id,
    });

    if (itemAlreadyInCart) {
      throw new Error("Item already in cart");
    }

    const cart = await CartModel.create({
      item: itemId,
      user: user.user._id,
      artist,
    });

    return cart;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const removeFromCart = async (_: any, { itemId }: any, context: any) => {
  try {
    const user: any = Authenticate(context);

    const itemNotInCart = await CartModel.findOne({
      item: itemId,
      user: user.user._id,
    });

    if (!itemNotInCart) {
      throw new Error("Item not in your cart");
    }

    const item = await CartModel.findOneAndDelete({ item: itemId });

    return item;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const confirmOrder = async (_: any, { items }, context: any) => {
  try {
    const user: any = Authenticate(context);

    const confirm = new ConfirmOrderModel({
      user: user?.user._id,
      items,
    });

    await confirm.save();

    const notification = new NotificationModel({
      notificationType: "orderConfirmed",
      user: user?.user?._id,
      artWorks:items,
      summary: "Order placed successfully",
    });
    await notification.save();

    // Fetch the artist for each item and send them a notification
    const artWorks = await ArtModel.find({ _id: { $in: items } }).populate('artist');

    for (const art of artWorks) {
      const artistNotification = new NotificationModel({
        notificationType: "newOrder",
        user: art.artist._id,
        artWorks: [art._id],
        summary: `Your artwork titled "${art.title}" has been ordered.`,
      });
      await artistNotification.save();
    }

    // Remove the items from the user's cart
    await CartModel.deleteMany({ user: user?.user._id, item: { $in: items } });

    return "You  have successfully confirmed your order";
  } catch (error) {
    console.log(error);
    throw error;
  }
};
