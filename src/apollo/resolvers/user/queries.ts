import Authenticate from '../../../middleware/auth';
import { FollowModel } from '../../../models/Follow';

export async function getMe(_: any, __: any, context: any) {
    try {
        const user = Authenticate(context)

        console.log("user >>", user);
        

        return user;
    } catch (err) {
        throw new Error(err);
    }
}

export async function getFollowers(_: any, {userId}, context: any) {
    try {
        Authenticate(context)

        const followers = await FollowModel.find({followedUser: userId})
        .populate({path: "followedBy", select: "-password -authType -userType"})
        .sort({createdAt: -1}).lean()

        return followers;
    } catch (err) {
        throw new Error(err);
    }
}

export async function getFollowing(_: any, {userId}, context: any) {
    try {
        Authenticate(context)

        const following = await FollowModel.find({followedBy: userId})
        .populate({path: "followedUser", select: "-password -authType -userType"})
        .sort({createdAt: -1}).lean()

        return following;
    } catch (error) {
        throw new Error(error);
    }
}




