import Authenticate from "../../../middleware/auth";
import { ArtModel } from "../../../models/Art";
import { BidModel } from "../../../models/Bid";
import { WalletModel } from "../../../models/Wallet";

// TO DO: NO AUCTION AFTER END DATE
export const placeBid = async (
  _: any,
  { bidAmount, artId }: any,
  context: any
) => {
  try {
    const user: any = Authenticate(context);

    const getArt = await ArtModel.findById(artId);

    const getWalletBallance = await WalletModel.findOne({
      user: user?.user._id,
    });

    if (getWalletBallance?.balance < bidAmount) {
      throw new Error("Studio balance not enough to place this bid");
    }

    if (!bidAmount) {
      throw new Error("Bid amount is required");
    }

    if (!getArt) {
      throw new Error("Art not found");
    }

    if (getArt.artState !== "auction") {
      throw new Error("Art not in auction");
    }

    if (getArt.artist.toString() === user.user._id.toString()) {
      throw new Error("You cannot bid on your own art");
    }

    if (getArt.auctionStartPrice >= bidAmount) {
      throw new Error("Bid amount should be greater than starting price");
    }

    if (bidAmount < getArt.highestBid) {
      throw new Error("Bid amount should be greater than highest bid");
    }

    const existingBid = await BidModel.findOne({ artId, bidBy: user.user._id });
    const additionalAmountAdded = bidAmount - existingBid?.bidAmount;

    if (existingBid) {
      existingBid.bidAmount = bidAmount;
      existingBid.bidAt = new Date();
      const updatedBid = await existingBid.save();

      getArt.highestBid = bidAmount;
      await getArt.save();

      getWalletBallance.balance =
        getWalletBallance.balance - additionalAmountAdded;
      getWalletBallance.auctionBidsPlacedAmount =
        getWalletBallance.auctionBidsPlacedAmount + additionalAmountAdded;

      await getWalletBallance.save();
      return updatedBid;
    } else {
      getWalletBallance.balance = getWalletBallance.balance - bidAmount;
      getWalletBallance.auctionBidsPlacedAmount =
        getWalletBallance.auctionBidsPlacedAmount + bidAmount;
      await getWalletBallance.save();

      getArt.highestBid = bidAmount;
      await getArt.save();

      const newBid = new BidModel({
        bidAmount,
        artId,
        bidAt: new Date(),
        bidBy: user.user._id,
      });

      const bid = await newBid.save();
      return bid;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateBidAmount = async (
  _: any,
  { bidId, bidAmount }: any,
  context: any
) => {
  try {
    const user: any = Authenticate(context);

    const getBid = await BidModel.findById(bidId);

    const getArt = await ArtModel.findById(getBid.artId);

    if (!getBid) {
      throw new Error("Bid not found");
    }

    if (getBid.bidBy.toString() !== user.user._id.toString()) {
      throw new Error("You cannot update this bid because it's not yours");
    }

    if (getArt.auctionStartPrice >= bidAmount) {
      throw new Error("Bid amount should be greater than base price");
    }

    if (getBid.bidAmount >= bidAmount) {
      throw new Error("Bid amount should be greater than current bid");
    }

    const bid = await BidModel.findByIdAndUpdate(
      bidId,
      { bidAmount },
      { new: true }
    );

    return bid;
  } catch (error) {
    console.log(error);
  }
};

export const updateStartPrice = async (
  _: any,
  { artId }: any,
  context: any
) => {
  try {
    const user: any = Authenticate(context);
    const getArt = await ArtModel.findById(artId);

    if (user.user._id !== getArt.artist.toString()) {
      throw new Error("You are not the owner of this art");
    }

    const highestBid = await BidModel.find({ artId })
      .populate("bidBy")
      .select("-password -authType -userType")
      .sort({ bidAmount: -1 })
      .limit(1)
      .lean();

    const art = await ArtModel.findByIdAndUpdate(
      artId,
      { auctionStartPrice: highestBid[0].bidAmount },
      { new: true }
    );

    return art;
  } catch (error) {
    console.log(error);
  }
};
