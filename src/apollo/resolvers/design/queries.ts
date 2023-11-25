import Authenticate from "../../../middleware/auth";
import { DesignModel } from "../../../models/Design";


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
        
    }
}