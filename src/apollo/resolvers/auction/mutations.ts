import Authenticate from "../../../middleware/auth";
import { ArtModel } from "../../../models/Art";
import { BidModel } from "../../../models/Bid";
import { NotificationModel } from "../../../models/Notifications";
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

    if (getArt.artSold) {
      throw new Error("Art already sold");
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

    const allBids = await BidModel.find({ artId })
      .sort({ bidAmount: -1 })
      .lean();

    const currentHighestBid = allBids[0];

    getWalletBallance.balance = getWalletBallance.balance - bidAmount;
    getWalletBallance.auctionBidsPlacedAmount =
      getWalletBallance.auctionBidsPlacedAmount + bidAmount;
    await getWalletBallance.save();

    getArt.highestBid = bidAmount;
    await getArt.save();

    // return previous highest bidders money
    if (currentHighestBid) {
      const bidderWallet = await WalletModel.findOne({
        user: currentHighestBid.bidBy,
      });
      bidderWallet.balance = bidderWallet.balance + currentHighestBid.bidAmount;
      bidderWallet.auctionBidsPlacedAmount =
        bidderWallet.auctionBidsPlacedAmount - currentHighestBid.bidAmount;
      await bidderWallet.save();
    }

    const existingBid = await BidModel.findOne({ artId, bidBy: user.user._id });

    if (existingBid) {
      existingBid.bidAmount = bidAmount;
      existingBid.bidAt = new Date();
      const updatedBid = await existingBid.save();
      return updatedBid;
    } else {
      const newBid = new BidModel({
        bidAmount,
        artId,
        bidAt: new Date(),
        bidBy: user.user._id,
      });


      const notification = new NotificationModel({
        user: user.user._id,
        notificationType: "bidPlaced",
        artWorks: [artId],
        summary: `You have successfully placed a bid on the art work "${getArt?.title}"`,
      })

      const artistNotification = new NotificationModel({
        user: getArt?.artist,
        notificationType: "newBid",
        artWorks: [artId],
        summary: `Your art work ${getArt?.title} has received a new bid`
      })

      const bid = await newBid.save();
      await notification.save();
      await artistNotification.save();
      return bid;
    }
  } catch (error) {
    console.log(error);
    throw error;
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

export const expireAuction = async (_: any, { artId }, context: any) => {
  try {

    const art = await ArtModel.findById(artId);

    if (!art) {
      throw new Error("Art not found");
    }

    if (art.artSold) {
      throw new Error("Art already sold");
    }

    if (art.artState !== "auction") {
      throw new Error("Art not in auction");
    }

    let currentDate = new Date();

    const allBids = await BidModel.find({ artId });

    if (art.auctionEndDate < currentDate && allBids.length > 0) {
      art.artSold = true;
      await art.save();
    }

    return "Auction expired, art is now sold";
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const endAuction = async (_: any, { artId }, context: any) => {
  try {
    const user: any = Authenticate(context);

    const art = await ArtModel.findOne(artId, { artist: user.user._id });

    if (!art) {
      throw new Error("Art not found");
    }

    if (art.artSold) {
      throw new Error("Art already sold");
    }

    if (art.artState !== "auction") {
      throw new Error("Art not in auction");
    }

    const allBids = await BidModel.find({ artId });

    if (allBids.length === 0) {
      throw new Error("No bids placed on this art");
    }

    art.artSold = true;
    await art.save();

    return "Auction ended, art is now sold";
  } catch (error) {
    console.log(error);
    throw error;
  }
};
