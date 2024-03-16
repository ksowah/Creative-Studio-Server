import Authenticate from "../../../middleware/auth";
import { WalletModel } from "../../../models/Wallet";

export const deposit = async (_: any, { amount }, context: any) => {
  try {
    const user: any = Authenticate(context);

    const wallet = await WalletModel.findOne({ user: user.user._id });


    if (!wallet) {
      throw new Error("Wallet not found");
    }

    const updatedWallet = await WalletModel.findByIdAndUpdate(
      wallet._id,
      { balance: wallet.balance + amount },
      { new: true }
    );

    return updatedWallet;
  } catch (error) {
    console.log(error);
    throw error
  }
};

export const withdraw = async (_: any, { amount }, context: any) => {
  try {
    const user: any = Authenticate(context);

    const wallet = await WalletModel.findById(user._id);

    if (!wallet) {
      throw new Error("Wallet not found");
    }

    if (wallet.balance < amount) {
      throw new Error("Insufficient balance");
    }

    const updatedWallet = await WalletModel.findByIdAndUpdate(
      wallet._id,
      { balance: wallet.balance - amount },
      { new: true }
    );

    return updatedWallet;
  } catch (error) {
    console.log(error);
    throw error
  }
};

