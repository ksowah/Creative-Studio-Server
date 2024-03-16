import Authenticate from "../../../middleware/auth";
import { WalletModel } from "../../../models/Wallet";

export const getWalletBallance = async (_: any, __: any, context: any) => {
  try {
    const user: any = Authenticate(context);

    const getWallet = await WalletModel.findOne({ user: user.user._id }).lean();

    if (!getWallet) {
      throw new Error("Wallet not found");
    }

    return getWallet;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
