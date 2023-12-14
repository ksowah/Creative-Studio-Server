import Authenticate from "../../../middleware/auth";
import { ArtModel } from "../../../models/Art";
import { LikeArtModel } from "../../../models/LikeArt";


export const getAllArtWorks = async (_:any, __:any, context:any) => {
    
    try {
        Authenticate(context);
    
            const artWorks = await ArtModel.find()
            .populate({path: "artist", select: "-password -authType -userType"})
            .sort({createdAt: -1}).lean()
        
            return artWorks;  
        
    } catch (error) {
        console.log(error);
    }
}

export const getUserArtWorks = async (_: any, { userId }: any, context: any) => {
    try {
        Authenticate(context);

        const artWorks = await ArtModel.find({ artist: userId })
            .populate({path: "artist", select: "-password -authType -userType"})
            .sort({createdAt: -1}).lean()

        return artWorks;
    } catch (error) {
        console.log(error);
    }
}

export async function getArtLikes(_: any, { artId }, context: any) {
    try {
        Authenticate(context);

        const likes = await LikeArtModel.find({ artId })
        .populate({path: "likedBy", select: "-password -authType -userType"})
        .sort({createdAt: -1}).lean()

        return {
            data: likes,
            numberOfLikes: likes.length
        }
    } catch (error) {
        console.log(error);
    }
}

