import bcrypt from "bcryptjs";
import { UserModel } from "../../../models/User";
import { __GENERATE_TOKEN, __sendEmail } from "../../../utils/functions";
import Authenticate from "../../../middleware/auth";
import { FollowModel } from "../../../models/Follow";
import { __template } from "../../../utils/html";
import { config } from "../../../config";
import { WalletModel } from "../../../models/Wallet";

// USER REGISTRATION
export const register = async (
  _: any,
  { registerInput: { fullName, email, password, avatar, username } }
) => {

  try {
    if (!email || !password || !fullName || !username) {
      throw new Error("All fields are required");
    }

    const userAlreadyExist = await UserModel.findOne({ email });

    const usernameTaken = await UserModel.findOne({ username });

    if (userAlreadyExist) {
      throw new Error("An unknown error occured");
    }

    if (usernameTaken) {
      throw new Error("This username is already taken");
    }

    let encryptedPassword = await bcrypt.hash(password, 12);

    const newUser = new UserModel({
      fullName,
      email,
      password: encryptedPassword,
      avatar: avatar || "",
      username,
    });

    const user = await newUser.save();

    if (user) {
      await __sendEmail(
        email,
        __template(
          "Click the button below to <strong>verified</strong> your account. ",
          "Verify Account",
          `${
            config.environment === "development"
              ? `http://localhost:3000/verify/${user._id}`
              : `https://creative-studio-client.vercel.app/verify/${user._id}`
          }`
        ),
        "Account Verification"
      );
    }

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editProfile = async (
  _: any,
  {
    editProfileInput: {
      fullName,
      avatar,
      bio,
      specialization,
      phoneNumber,
      website,
    },
  },
  context: any
) => {
  try {
    const user: any = Authenticate(context);

    if (!fullName) {
      throw new Error("Make sure all required fields are filled");
    }

    const editUserProfile: any = await UserModel.findByIdAndUpdate(
      user?.user._id,
      {
        fullName,
        avatar,
        bio,
        specialization,
        phoneNumber,
        website,
      },
      { new: true }
    );

    const token = __GENERATE_TOKEN(editUserProfile);

    return { user: editUserProfile, token };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// USER LOGIN
export const login = async (_: any, { loginInput: { email, password } }) => {
  try {
    if (!email || !password) {
      throw new Error("All fields are required");
    }

    const user: any = await UserModel.findOne({ email, verified: true });

    const userNotVerified: any = await UserModel.findOne({
      email,
      verified: false,
    });

    if (userNotVerified) {
      throw new Error("This user is not verified");
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = __GENERATE_TOKEN(user);

      return { user, token };
    } else {
      throw new Error("Invalid user credentials");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const follow = async (_: any, { followedUser }, context: any) => {
  try {
    const user: any = Authenticate(context);

    const alreadyFollowed = await FollowModel.findOne({
      followedUser,
      followedBy: user.user._id,
    });

    if (alreadyFollowed) {
      throw new Error("You have already followed this user");
    }

    if (user.user._id === followedUser) {
      throw new Error("You cannot follow yourself");
    }

    const follow = new FollowModel({
      followedBy: user.user._id,
      followedUser,
      followedAt: new Date().toISOString(),
    });

    const followResult = await follow.save();

    return followResult;
  } catch (error) {
    console.log(error);
  }
};

export const unfollow = async (_: any, { followedUser }, context: any) => {
  try {
    const user: any = Authenticate(context);

    const alreadyFollowed = await FollowModel.findOne({
      followedUser,
      followedBy: user.user._id,
    });

    if (!alreadyFollowed) {
      throw new Error("You have not followed this user");
    }

    const unfollow = await FollowModel.findByIdAndDelete(alreadyFollowed._id);

    return unfollow;
  } catch (error) {
    console.log(error);
  }
};

export const becomePremiumUser = async (_: any, __: any, context: any) => {
  try {
    const user: any = Authenticate(context);

    const getUserFromDB = await UserModel.findById(user.user._id);

    if (getUserFromDB.subscription === "PREMIUM") {
      throw new Error("You are already a premium user");
    }

    const updateUser = await UserModel.findByIdAndUpdate(
      user.user._id,
      { subscription: "PREMIUM" },
      { new: true }
    );

    return updateUser;
  } catch (error) {
    console.log(error);
  }
};

export const becomeCreator = async (_: any, __: any, context: any) => {
  try {
    const user: any = Authenticate(context);

    const getUserFromDB = await UserModel.findById(user.user._id);

    if (getUserFromDB.subscription !== "PREMIUM") {
      throw new Error("You are not a premium user");
    }

    if (getUserFromDB.userType === "CREATOR") {
      throw new Error("You are already a creater");
    }

    const updateUser = await UserModel.findByIdAndUpdate(
      user.user._id,
      { userType: "CREATOR" },
      { new: true }
    );

    return updateUser;
  } catch (error) {
    console.log(error);
  }
};

export const verifyUser = async (_: any, { userId }, context: any) => {
  try {
    const getUserFromDB = await UserModel.findById(userId);

    if (!getUserFromDB) {
      throw new Error("User not found");
    }

    if (getUserFromDB.verified) {
      throw new Error("User already verified");
    }

    const wallet = new WalletModel({
      user: userId
    })

    await wallet.save()

    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      { verified: true },
      { new: true }
    );

    return updateUser;
  } catch (error) {
    console.log(error);
    throw error
  }
};
