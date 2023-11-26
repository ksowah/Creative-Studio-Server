import Authenticate from "../../../middleware/auth";
import { CommentModel } from "../../../models/Comment";
import { DesignModel } from "../../../models/Design";
import publish from "../../../utils/pubsub";
import { LikeModel } from "../../../models/Like";
import { FollowModel } from "../../../models/Follow";
import { SavedDesignModel } from "../../../models/SavedDesign";

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
        console.log(error);
        
    }
}

export const likeDesign = async (_:any, { designId }, context:any) => {
    try {
        const user:any = Authenticate(context)

        const alreadyLiked = await LikeModel.findOne({designId, likedBy: user.user._id});

        if(alreadyLiked) {
            throw new Error("You have already liked this design");
        }

        const like = new LikeModel({
            likedBy: user.user._id,
            designId,
            likedAt: new Date().toISOString(),
        }) 

        const likeResult = await like.save();

        publish.pubsub.publish(`LIKE_DESIGN`, {
            newLike: likeResult,
          });

        return likeResult;

    } catch (error) {
        console.log(error);
    }
}

export const saveDesign = async (_:any, { designId }, context:any) => {
    try {
        const user:any = Authenticate(context)

        const alreadySaved = await SavedDesignModel.findOne({design:designId, savedBy: user.user._id});

        if(alreadySaved) {
            throw new Error("You have already saved this design");
        }

        const save = new SavedDesignModel({
            savedBy: user.user._id,
            design: designId,
            savedAt: new Date().toISOString(),
        })

        const saveResult = await save.save();

        return saveResult;
    } catch (error) {
        console.log(error);
    }
}