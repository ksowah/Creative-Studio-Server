import Authenticate from "../../../middleware/auth";
import { ArtModel } from "../../../models/Art";
import { BidModel } from "../../../models/Bid";


export const getArtBiddings = async (_: any, { artId }: any, context: any) => {
    try {

        const biddings = await BidModel.find({ artId })
        .populate("bidBy")
        .sort({bidAmount: -1}).lean()

        return biddings;
    } catch (error) {
        console.log(error);
    }
}


export const getActiveAndUpcomingAuctions = async (_: any, __: any, context: any) => {
    try {
        const currentDate = new Date();

        // Find all arts that are in the "auction" state and have a start date in the future
        const activeAuctions = await ArtModel.find({
            artState: "auction",
            auctionStartDate: { $lte: currentDate }, // Auctions that have already started
            auctionEndDate: { $gte: currentDate },   // Auctions that haven't ended yet
        }).populate("artist").lean();

        // Find all arts that are in the "auction" state and have a start date in the future
        const upcomingAuctions = await ArtModel.find({
            artState: "auction",
            auctionStartDate: { $gt: currentDate },   // Auctions that haven't started yet
        }).populate("artist").lean();

        // Combine both active and upcoming auctions into a single array
        const allAuctions = [...activeAuctions, ...upcomingAuctions];

        return allAuctions;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getHighestBid = async (_: any, { artId }: any, context: any) => {
    try {

        Authenticate(context)

        const highestBid = await BidModel.find({ artId })
        .populate("bidBy")
        .sort({bidAmount: -1})
        .limit(1).lean()

        return highestBid[0];
    } catch (error) {
        console.log(error);
    }
}