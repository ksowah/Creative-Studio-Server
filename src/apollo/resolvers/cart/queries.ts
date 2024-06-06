import Authenticate from "../../../middleware/auth";
import { ArtModel } from "../../../models/Art";
import { CartModel } from "../../../models/Cart";
import { ConfirmOrderModel } from "../../../models/ConfirmOrder";

export const getCartItems = async (_: any, __: any, context: any) => {
  try {
    const user: any = Authenticate(context);

    const cartItems = await CartModel.find({ user: user.user._id })
      .populate({ path: "item" })
      .populate({
        path: "artist",
      })
      .sort({ createdAt: -1 })
      .lean();

    return cartItems;
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = async (_: any, __: any, context: any) => {
  try {
    const user: any = Authenticate(context);

    const orders = await ConfirmOrderModel.find({ user: user.user._id })
    
    let userOrders = []

    const artPromises = orders.flatMap(order =>
      order.items.map(async (item) => {
        const art = await ArtModel.findById(item).populate({ path: "artist" });
        return art;
      })
    );

    userOrders = await Promise.all(artPromises);

    return userOrders
  } catch (error) {
    console.log(error);
    throw error
  }
};
