import Authenticate from "../../../middleware/auth";
import { FollowModel } from "../../../models/Follow";
import { UserModel } from "../../../models/User";

export async function getMe(_: any, __: any, context: any) {
  try {
    const user = Authenticate(context);

    return user;
  } catch (err) {
    console.log(err);

    throw err;
  }
}

// get user by username
export async function getUserByUsername(
  _: any,
  { username }: any,
  context: any
) {
  try {
    const user = await UserModel.findOne({ username }).lean();

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getFollowers(_: any, { userId }) {
  try {
    const followers = await FollowModel.find({ followedUser: userId })
      .populate({ path: "followedBy", select: "-password -authType -userType" })
      .sort({ createdAt: -1 })
      .lean();

    return {
      data: followers,
      numberOfFollowers: followers.length,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getFollowing(_: any, { userId }) {
  try {

    const following = await FollowModel.find({ followedBy: userId })
      .populate({
        path: "followedUser",
        select: "-password -authType -userType",
      })
      .sort({ createdAt: -1 })
      .lean();

    return {
      data: following,
      followingCount: following.length,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
