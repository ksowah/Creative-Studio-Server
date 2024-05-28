import Authenticate from "../../../middleware/auth";
import { CommentModel } from "../../../models/Comment";
import { DesignModel } from "../../../models/Design";
import publish from "../../../utils/pubsub";
import { LikeModel } from "../../../models/Like";
import { SavedDesignModel } from "../../../models/SavedDesign";
import { __sendEmail } from "../../../utils/functions";
import { __template } from "../../../utils/html";
import { UserModel } from "../../../models/User";
import { error } from "console";
import { CommentRepliesModel } from "../../../models/CommentReplies";

export const becomeDesigner = async (_: any, __: any, context: any) => {
  try {
    const user: any = Authenticate(context);

    const getUserFromDB = await UserModel.findById(user.user._id);

    if (getUserFromDB.subscription !== "PREMIUM") {
      throw new Error("You are not a premium user");
    }

    if (getUserFromDB.userType !== "USER") {
      throw new Error("You are already a creater");
    }

    const updateUser = await UserModel.findByIdAndUpdate(
      user.user._id,
      { userType: "DESIGNER" },
      { new: true }
    );

    return updateUser;
  } catch (error) {
    console.log(error);
  }
};

export const createDesign = async (
  _: any,
  {
    createDesignInput: {
      preview,
      description,
      designFile,
      designFileRef,
      tags,
      category,
      designSubscription,
      designImages,
      title,
      previewImageRef,
      designImagesRef,
    },
  },
  context: any
) => {
  try {
    const user: any = Authenticate(context);

    const getUserFromDB = await UserModel.findById(user.user._id);

    if (
      getUserFromDB.userType !== "CREATOR" &&
      getUserFromDB.userType !== "DESIGNER"
    ) {
      throw new Error("You are not authorized to publish a designs");
    }

    if (
      !preview ||
      !description ||
      !designFile ||
      !category ||
      !designSubscription ||
      !title
    ) {
      throw new Error("Make sure all required fields are filled");
    }

    if (!previewImageRef) {
      throw new Error("An unknown error occured, please try again later");
    }

    const newDesign = new DesignModel({
      designer: user.user._id,
      preview,
      description,
      designFile,
      designFileRef,
      designImages,
      tags,
      category,
      designSubscription,
      title,
      previewImageRef,
      designImagesRef,
      createdAt: new Date().toISOString(),
    });

    const design = await newDesign.save();

    return design;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateDesign = async (
  _: any,
  {
    updateDesignInput: {
      designId,
      preview,
      description,
      designFile,
      designFileRef,
      tags,
      category,
      designSubscription,
      designImages,
      designImagesRef,
      previewImageRef,
    },
  },
  context: any
) => {
  try {
    const user: any = Authenticate(context);

    const getUserFromDB = await UserModel.findById(user.user._id);

    if (
      getUserFromDB.userType !== "CREATOR" &&
      getUserFromDB.userType !== "DESIGNER"
    ) {
      throw new Error("You are not a designer");
    }

    const design = await DesignModel.findById(designId);

    if (!design) {
      throw new Error("Design not found");
    }

    if (design.designer.toString() !== user.user._id.toString()) {
      throw new Error("You are not the owner of this design");
    }

    const updateDesign = await DesignModel.findByIdAndUpdate(
      designId,
      {
        preview,
        description,
        designFile,
        tags,
        category,
        designSubscription,
        designFileRef,
        designImages,
        designImagesRef,
        previewImageRef,
      },
      { new: true }
    );

    return updateDesign;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteDesign = async (_: any, { designId }, context: any) => {
  try {
    const user: any = Authenticate(context);

    const design = await DesignModel.findOne({
      _id: designId,
      designer: user.user._id,
    });

    if (!design) {
      throw new Error("Design not found");
    }

    await DesignModel.findByIdAndDelete(designId);

    return "Design deleted";
  } catch (error) {
    console.log(error);
  }
};

export const createComment = async (
  _: any,
  { designId, comment },
  context: any
) => {
  try {
    const user: any = Authenticate(context);

    const newComment = new CommentModel({
      comment,
      commentedBy: user.user._id,
      commentedAt: new Date().toISOString(),
      designId,
    });

    const commentResult = await newComment.save();

    const { designer }: any = await DesignModel.findById(designId)
      .populate({ path: "designer", select: "email" })
      .lean();

    if (commentResult) {
      await __sendEmail(
        designer.email,
        __template(
          "You have just received a new feedback on your design. Visit your profile for  more details",
          "Visit Profile",
          "https://ksowah.netlify.app/"
        ),
        "New Comment on your Design"
      );
    }

    console.log("designer >>", designer.email);

    publish.pubsub.publish(`NEW_COMMENT`, {
      newComment: commentResult,
    });

    return commentResult;
  } catch (error) {
    console.log(error);
    throw error
  }
};

export const replyToComment = async (
  _: any,
  { commentId, reply },
  context: any
) => {
  try {
    const user: any = Authenticate(context);

    const comment = await CommentModel.findById(commentId);

    if(!comment){
      throw new Error("Comment not found")
    }

    const newReply = new CommentRepliesModel({
      reply,
      commentId,
      repliedBy: user?.user._id,
    })

    const replyResult = await newReply.save();

    publish.pubsub.publish(`NEW_REPLY`, {
      newCommentReply: replyResult,
    });

    return replyResult
  } catch(error) {
    console.log(error);
    throw error
  }
};

export const likeDesign = async (_: any, { designId }, context: any) => {
  try {
    const user: any = Authenticate(context);

    const alreadyLiked = await LikeModel.findOne({
      designId,
      likedBy: user.user._id,
    });

    if (alreadyLiked) {
      throw new Error("You have already liked this design");
    }

    const like = new LikeModel({
      likedBy: user.user._id,
      designId,
      likedAt: new Date().toISOString(),
    });

    const likeResult = await like.save();

    publish.pubsub.publish(`LIKE_DESIGN`, {
      newLike: likeResult,
    });

    return likeResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const unlikeDesign = async (_: any, { designId }, context: any) => {
  try {
    const user: any = Authenticate(context);

    const alreadyLiked = await LikeModel.findOne({
      designId,
      likedBy: user.user._id,
    });

    if (!alreadyLiked) {
      throw new Error("You have not liked this design");
    }

    const unlike = await LikeModel.findByIdAndDelete(alreadyLiked._id);

    return "Design unliked";
  } catch (error) {
    console.log(error);
  }
};

export const saveDesign = async (
  _: any,
  { designId, designer },
  context: any
) => {
  try {
    const user: any = Authenticate(context);

    const alreadySaved = await SavedDesignModel.findOne({
      design: designId,
      savedBy: user.user._id,
    });

    if (alreadySaved) {
      throw new Error("You have already saved this design");
    }

    const save = new SavedDesignModel({
      savedBy: user.user._id,
      design: designId,
      savedAt: new Date().toISOString(),
      designer,
    });

    const saveResult = await save.save();

    const design = await DesignModel.findById(designId);

    if (!design) {
      throw new Error("Design not found");
    }

    await DesignModel.findByIdAndUpdate(designId, { saves: design.saves + 1 });

    return saveResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const unsaveDesign = async (_: any, { designId }, context: any) => {
  try {
    const user: any = Authenticate(context);

    const alreadySaved = await SavedDesignModel.findOne({
      design: designId,
      savedBy: user.user._id,
    });

    if (!alreadySaved) {
      throw new Error("You have not saved this design");
    }

    await SavedDesignModel.findByIdAndDelete(alreadySaved._id);

    const design = await DesignModel.findById(designId);

    if (!design) {
      throw new Error("Design not found");
    }

    await DesignModel.findByIdAndUpdate(designId, { saves: design.saves - 1 });

    return "Design unsaved";
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const countDesignViews = async (_: any, { designId }) => {
  try {
    const design = await DesignModel.findById(designId);

    if (!design) {
      throw new Error("Design not found");
    }

    const updateDesignViewCount = await DesignModel.findByIdAndUpdate(
      designId,
      {
        views: design.views + 1,
      }
    );

    return updateDesignViewCount.views;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
