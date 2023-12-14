import Authenticate from "../../../middleware/auth";
import { CommentModel } from "../../../models/Comment";
import { DesignModel } from "../../../models/Design";
import publish from "../../../utils/pubsub";
import { LikeModel } from "../../../models/Like";
import { SavedDesignModel } from "../../../models/SavedDesign";
import { __sendEmail } from "../../../utils/functions";
import { __template } from "../../../utils/html";
import { UserModel } from "../../../models/User";

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
      designFiles,
      tags,
      category,
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

    const newDesign = new DesignModel({
      designer: user.user._id,
      preview,
      description,
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
};

export const updateDesign = async (
  _: any,
  {
    updateDesignInput: {
      designId,
      preview,
      description,
      designFiles,
      tags,
      category,
      designSubscription,
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
        designFiles,
        tags,
        category,
        designSubscription,
      },
      { new: true }
    );

    return updateDesign;
  } catch (error) {
    console.log(error);
  }
}

export const deleteDesign = async (_: any, { designId }, context: any) => {
  try {
    const user: any = Authenticate(context);

    const design = await DesignModel.findOne({_id: designId, designer: user.user._id});

    if (!design) {
      throw new Error("Design not found");
    }

    await DesignModel.findByIdAndDelete(designId);

    return "Design deleted";
  } catch (error) {
    console.log(error);
  }
}

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

    console.log(unlike);

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

    return saveResult;
  } catch (error) {
    console.log(error);
  }
};

export const unsaveDesign = async (
  _: any,
  { designId },
  context: any
) => {
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

    return "Design unsaved";
  } catch (error) {
    console.log(error);
  }
};


