import Authenticate from "../../../middleware/auth";
import { CommentModel } from "../../../models/Comment";
import { DesignModel } from "../../../models/Design";
import publish from "../../../utils/pubsub";


export const createDesign = async (_:any, { createDesignInput: { preview, description, designType, designFiles, tags, category } }, context:any) => {
    
    try {
        const user:any = Authenticate(context);
    
            const newDesign = new DesignModel({
                designer: user.user._id,
                preview,
                description,
                designType,
                designFiles,
                tags,
                category,
                createdAt: new Date().toISOString(),
            });
        
            const design = await newDesign.save();
        
            return design;  
        
    } catch (error) {
        console.log(error);
    }

}

export const createComment = async (_:any, { designId, comment }, context:any) => {
    try {
        
        const user:any = Authenticate(context)
        
        const newComment = new CommentModel({
            comment,
            commentedBy: user.user._id,
            commentedAt: new Date().toISOString(),
            designId
        })
        
        const commentResult = await newComment.save();
        

        publish.pubsub.publish(`NEW_COMMENT`, {
            newComment: commentResult,
          });

        return commentResult;
    } catch (error) {
        
    }
}

export const likeDesign = async (_:any, { designId }, context:any) => {
    try {
        const user:any = Authenticate(context)

        const design = DesignModel.findByIdAndUpdate(designId, {
            
        })
    } catch (error) {
        
    }
}