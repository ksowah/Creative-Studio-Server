import publish from "../../../utils/pubsub";

export const newComment = {
    
    subscribe: publish.withFilter(
        () => publish.pubsub.asyncIterator(["NEW_COMMENT"]),
        (payload, variables) => {
            const payLoadDesignId = payload.newComment.designId
            const variablesDesignId = variables.designId.trim();

            return payLoadDesignId === variablesDesignId;
        }
    )

}