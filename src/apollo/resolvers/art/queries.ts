import Authenticate from "../../../middleware/auth";
import { ArtModel } from "../../../models/Art";


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

