import Authenticate from "../../../middleware/auth";
import { CommentModel } from "../../../models/Comment";
import { CommentRepliesModel } from "../../../models/CommentReplies";
import { DesignModel } from "../../../models/Design";
import { LikeModel } from "../../../models/Like";
import { SavedDesignModel } from "../../../models/SavedDesign";

export const getAllDesigns = async () => {
  try {
    const designs = await DesignModel.find()
      .populate({ path: "designer" })
      .sort({ createdAt: -1 })
      .lean();

    return designs;
  } catch (error) {
    console.log(error);
  }
};

export const getDesignById = async (_:any, {designId}:any) => {
    try {
        const design = await DesignModel.findById(designId)
        .populate({ path: "designer" })

        return design
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getUserDesigns = async (_: any, { userId }: any, context: any) => {
  try {
    const designs = await DesignModel.find({ designer: userId })
      .populate({ path: "designer" })
      .sort({ createdAt: -1 })
      .lean();

    return designs;
  } catch (error) {
    console.log(error);
    throw error
  }
};

export const getSavedDesigns = async (_: any, __: any, context: any) => {
  try {
    const user: any = Authenticate(context);

    const designs = await SavedDesignModel.find({ savedBy: user.user._id })
      .populate({ path: "design" })
      .populate({
        path: "designer",
        model: "User"
      })
      .sort({ createdAt: -1 })
      .lean();

    return designs;
  } catch (error) {
    console.log(error);
  }
};

export async function getDesignLikes(_: any, { designId }) {
  try {
    const likes = await LikeModel.find({ designId })
      .populate({ path: "likedBy"})
      .sort({ createdAt: -1 })
      .lean();

    return {
      data: likes,
      numberOfLikes: likes.length,
    };
  } catch (error) {
    console.log(error);
    throw error
  }
}

export const getDesignComments = async (_:any, {designId})=> {
  try {
    const design = await DesignModel.findById(designId)

    if(!design){
      throw new Error("Design not found")
    }

    const comments = await CommentModel.find({designId})
    .populate({path: "commentedBy"})
    .sort({ createdAt: -1 })
    .lean()

    return comments
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getCommentReplies = async (_:any, {commentId}) => {
  try {
    const comment = await CommentModel.findById(commentId)

    if(!comment){
      throw new Error("Comment not found")
    }

    const replies = await CommentRepliesModel.find({commentId})
    .populate({path: "repliedBy"})
    .lean()

    return replies;
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function searchDesigns(_: any, { searchTerm }, context: any) {
  try {
    Authenticate(context);

    const designs = await DesignModel.find({
      $or: [
        { description: { $regex: searchTerm, $options: "i" } },
        { tags: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
      ],
    })
      .populate({ path: "designer" })
      .sort({ createdAt: -1 })
      .lean();

    if (designs.length === 0) {
      // return all the designs
      const designs = await DesignModel.find()
        .populate({ path: "designer" })
        .sort({ createdAt: -1 })
        .lean();

      return designs;
    }

    return designs;
  } catch (error) {
    console.log(error)
    throw error
  }
}
