import Authenticate from "../../../middleware/auth";
import { DesignModel } from "../../../models/Design";
import { SavedDesignModel } from "../../../models/SavedDesign";


export const getAllDesigns = async (_:any, __:any, context:any) => {
    
    try {
        Authenticate(context);
    
            const designs = await DesignModel.find()
            .populate({path: "designer", select: "-password -authType -userType"})
            .sort({createdAt: -1}).lean()
        
            return designs;  
        
    } catch (error) {
        console.log(error);
    }
}

export const getUserDesigns = async (_: any, { userId }: any, context: any) => {
    try {
        Authenticate(context);

        const designs = await DesignModel.find({ designer: userId })
            .populate({path: "designer", select: "-password -authType -userType"})
            .sort({createdAt: -1}).lean()

        return designs;
    } catch (error) {
        console.log(error);
    }
}

export const getSavedDesigns = async (_:any, __:any, context: any) => {
    try {
        const user:any = Authenticate(context);

        const designs = await SavedDesignModel.find({ savedBy: user.user._id })
        .populate({path: "design"})
        .sort({createdAt: -1}).lean()

        return designs;
    } catch (error) {
        console.log(error);
    }
}