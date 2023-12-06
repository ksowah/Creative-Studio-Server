import Authenticate from "../../../middleware/auth";
import { CartModel } from "../../../models/Cart";

export const getCartItems = async (_: any, __: any, context: any) => {
  try {
    const user: any = Authenticate(context);

    const cartItems = await CartModel.find({ user: user.user._id })
      .populate({ path: "item" })
      .populate({
        path: "artist",
        select: "-password -authType -userType",
      })
      .sort({ createdAt: -1 })
      .lean();

    return cartItems;
  } catch (error) {
    console.log(error);
  }
};
