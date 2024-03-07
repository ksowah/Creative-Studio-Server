import Authenticate from "../../../middleware/auth";
import { ArtModel } from "../../../models/Art";
import { LikeArtModel } from "../../../models/LikeArt";
import { UserModel } from "../../../models/User";

export const becomeArtist = async (_: any, __: any, context: any) => {
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
      { userType: "ARTIST" },
      { new: true }
    );

    return updateUser;
  } catch (error) {
    console.log(error);
  }
};

export const createArt = async (
  _: any,
  {
    artInput: {
      title,
      description,
      artImages,
      category,
      dimensions,
      price,
      artState,
      auctionStartPrice,
      artPreview,
      previewImageRef,
      artImagesRef,
      auctionStartDate,
      auctionEndDate,
    },
  },
  context: any
) => {
  try {
    const user: any = Authenticate(context);

    const getUserFromDB = await UserModel.findById(user.user._id);

    if (
      getUserFromDB.userType !== "CREATOR" &&
      getUserFromDB.userType !== "ARTIST"
    ) {
      throw new Error("You are not an artist");
    }

    if (!title || !description || !category || !dimensions || !artState || !artPreview) {
      throw new Error("Fill all required fields");
    }

    const newArt = new ArtModel({
      title,
      description,
      artist: getUserFromDB._id,
      artImages,
      category,
      dimensions,
      price,
      artState,
      auctionStartPrice,
      artPreview,
      previewImageRef,
      artImagesRef,
      auctionStartDate,
      auctionEndDate,
    });

    const art = await newArt.save();

    return art;

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateArt = async (
  _: any,
  {
    artInput: {
      artId,
      title,
      description,
      artImages,
      category,
      dimensions,
      price,
      artState,
      auctionStartPrice,
      artPreview,
      previewImageRef,
      artImagesRef,
    },
  },
  context: any
) => {
  try {
    const user: any = Authenticate(context);

    const getUserFromDB = await UserModel.findById(user.user._id);

    if (
      getUserFromDB.userType !== "CREATOR" &&
      getUserFromDB.userType !== "ARTIST"
    ) {
      throw new Error("You are not an artist");
    }

    const art = await ArtModel.findById(artId);

    if (!art) {
      throw new Error("Art not found");
    }

    if (art.artist.toString() !== user.user._id) {
      throw new Error("You are not the owner of this art");
    }

    const updatedArt = await ArtModel.findByIdAndUpdate(
      artId,
      {
        title,
        description,
        artImages,
        category,
        dimensions,
        price,
        artState,
        auctionStartPrice,
        artPreview,
        previewImageRef,
        artImagesRef,
      },
      { new: true }
    );

    return updatedArt;
  } catch (error) {
    console.log(error);
  }
};

export const deleteArt = async (_: any, { artId }, context: any) => {
  try {
    const user: any = Authenticate(context);

    const getUserFromDB = await UserModel.findById(user.user._id);

    if (
      getUserFromDB.userType !== "CREATOR" &&
      getUserFromDB.userType !== "ARTIST"
    ) {
      throw new Error("You are not an artist");
    }

    const art = await ArtModel.findById(artId);

    if (!art) {
      throw new Error("Art not found");
    }

    if (art.artist.toString() !== user.user._id) {
      throw new Error("You are not the owner of this art");
    }

    await ArtModel.findByIdAndDelete(artId);

    return "Art deleted successfully";
  } catch (error) {
    console.log(error);
  }
}

export const likeArt = async (_: any, { artId }, context: any) => {
  try {
    const user: any = Authenticate(context);

    const alreadyLiked = await LikeArtModel.findOne({
      artId,
      likedBy: user.user._id,
    });

    if (alreadyLiked) {
      throw new Error("You have already liked this art piece");
    }

    const like = new LikeArtModel({
      likedBy: user.user._id,
      artId,
      likedAt: new Date().toISOString(),
    });

    const likeResult = await like.save();

    return likeResult;

  } catch (error) {
    console.log(error);
  }
}

export const unlikeArt = async (_: any, { artId }, context: any) => {
  try {
    const user: any = Authenticate(context);

    const alreadyLiked = await LikeArtModel.findOne({
      artId,
      likedBy: user.user._id,
    });

    if (!alreadyLiked) {
      throw new Error("You have not liked this art piece");
    }

    const unlike = await LikeArtModel.findByIdAndDelete(alreadyLiked._id);

    console.log(unlike);

    return "Art unliked";
  } catch (error) {
    console.log(error);
  }
}
