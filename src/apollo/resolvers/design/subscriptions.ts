import { UserModel } from "../../../models/User";
import publish from "../../../utils/pubsub";

export const newComment = {
  subscribe: publish.withFilter(
    () => publish.pubsub.asyncIterator(["NEW_COMMENT"]),
    async (payload, variables) => {
      const payLoadDesignId = payload.newComment.designId;
      const variablesDesignId = variables.designId.trim();

      const { designId, comment, commentedBy, commentedAt } =
        payload.newComment;

      const detailsOfUserCommented = await UserModel.findById(commentedBy);

      const { _id, fullName, email, avatar, username } = detailsOfUserCommented;

      payload.newComment = {
        _id: payload.newComment._id,
        designId,
        comment,
        commentedBy: {
          _id,
          fullName,
          email,
          avatar,
          username,
        },
        commentedAt,
      };

      return payLoadDesignId === variablesDesignId;
    }
  ),
};

export const newCommentReply = {
  subscribe: publish.withFilter(
    () => publish.pubsub.asyncIterator(["NEW_REPLY"]),
    async (payload, variables) => {
      const payLoadCommentId = payload.newCommentReply.commentId;
      const variablesCommentId = variables.commentId.trim();
      const { reply, commentId, repliedBy, repliedAt } =
        payload.newCommentReply;

      const detailsOfUserReplied = await UserModel.findById(repliedBy);
      
      const { _id, fullName, email, avatar, username } = detailsOfUserReplied;
      payload.newCommentReply = {
        _id: payload.newCommentReply._id,
        reply,
        commentId,
        repliedBy: {
          _id,
          fullName,
          email,
          avatar,
          username,
        },
        repliedAt,
      };

      return payLoadCommentId === variablesCommentId;
    }
  ),
};

export const newLike = {
  subscribe: publish.withFilter(
    () => publish.pubsub.asyncIterator(["LIKE_DESIGN"]),
    async (payload, variables) => {
      const payLoadDesignId = payload.newLike.designId;
      const variablesDesignId = variables.designId.trim();

      const detailsOfUserLiked = await UserModel.findById(
        payload.newLike.likedBy
      );

      const { _id, fullName, email, avatar, username } = detailsOfUserLiked;

      payload.newLike = {
        ...payload.newLike._doc,
        likedBy: {
          _id,
          fullName,
          email,
          avatar,
          username,
        },
      };

      return payLoadDesignId === variablesDesignId;
    }
  ),
};
