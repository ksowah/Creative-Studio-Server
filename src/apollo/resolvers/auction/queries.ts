import Authenticate from "../../../middleware/auth";
import { BidModel } from "../../../models/Bid";


export const getArtBiddings = async (_: any, { artId }: any, context: any) => {
    try {

        const user:any = Authenticate(context)

        const biddings = await BidModel.find({ artId })
        .populate("bidBy")
        .select("-password -authType -userType")
        .sort({createdAt: -1}).lean()

        console.log("biddings", biddings);
        

        return biddings;
    } catch (error) {
        console.log(error);
    }
}

export const getHighestBid = async (_: any, { artId }: any, context: any) => {
    try {

        Authenticate(context)

        const highestBid = await BidModel.find({ artId })
        .populate("bidBy")
        .select("-password -authType -userType")
        .sort({bidAmount: -1})
        .limit(1).lean()

        return highestBid[0];
    } catch (error) {
        console.log(error);
    }
}