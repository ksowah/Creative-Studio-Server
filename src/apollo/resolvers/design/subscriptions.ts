import { UserModel } from "../../../models/User";
import publish from "../../../utils/pubsub";



export const newComment = {
    
    subscribe: publish.withFilter(
        () => publish.pubsub.asyncIterator(["NEW_COMMENT"]),
       async (payload, variables) => {
            const payLoadDesignId = payload.newComment.designId
            const variablesDesignId = variables.designId.trim();
            
            const detailsOfUserCommented = await UserModel.findById(payload.newComment.commentedBy);

            const { _id, fullName, email, avatar, username } = detailsOfUserCommented;

            payload.newComment = {
                ...payload.newComment._doc,
                commentedBy: {
                    _id,
                    fullName,
                    email,
                    avatar,
                    username
                }
            }

            return payLoadDesignId === variablesDesignId;
        }
    )

}

export const newLike = {
    subscribe: publish.withFilter(
        () => publish.pubsub.asyncIterator(["LIKE_DESIGN"]),
        async (payload, variables) => {

            
            const payLoadDesignId = payload.newLike.designId
            const variablesDesignId = variables.designId.trim();
            
            const detailsOfUserLiked = await UserModel.findById(payload.newLike.likedBy);

            const { _id, fullName, email, avatar, username } = detailsOfUserLiked;

            payload.newLike = {
                ...payload.newLike._doc,
                likedBy: {
                    _id,
                    fullName,
                    email,
                    avatar,
                    username
                }
            }

            return payLoadDesignId === variablesDesignId;
        }
    )

}