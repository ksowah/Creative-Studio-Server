import Authenticate from "../../../middleware/auth";
import { ArtModel } from "../../../models/Art";
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

    const newArt = new ArtModel({
      title,
      description,
      artist: getUserFromDB._id,
      artImages,
      category,
      dimensions,
      price,
      artState,
    });

    const art = await newArt.save();

    return art;
  } catch (error) {
    console.log(error);
  }
};
