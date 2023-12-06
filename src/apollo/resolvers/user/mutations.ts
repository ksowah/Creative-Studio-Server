import bcrypt from 'bcryptjs';
import { UserModel } from '../../../models/User';
import { __GENERATE_TOKEN, __sendEmail } from '../../../utils/functions';
import { User } from '../../../types';
import Authenticate from '../../../middleware/auth';
import { FollowModel } from '../../../models/Follow';
import { __template } from '../../../utils/html';


// USER REGISTRATION
export const register = async (_:any, { registerInput: { fullName, email, password, avatar, username } }) => {
    
    try {
        const userAlreadyExist = await UserModel.findOne({ email });
    
        if (userAlreadyExist) {
            throw new Error('This user already exists');
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

        if(user) {
            await __sendEmail(
                email,
                __template(
                    "Congratulations, your account has now been <strong>verified</strong>",
                    "Sign in",
                    "https://ksowah.netlify.app/",
                ),
                "Account Verification"
            )
        }
    
        return user;
        
    } catch (error) {
        console.log(error)
    }

};


// USER LOGIN
export const login = async (_:any, { loginInput: { email, password } }) => {

    try {
        const user: User = await UserModel.findOne({ email });

        // @ts-ignore
        if (user && bcrypt.compare(password, user.password)) {
            const token = __GENERATE_TOKEN(user);

            return { user, token }
            
        }else {
            throw new Error('Invalid credentials');
        }
        
    } catch (error) {
        console.log(error);
    }

}

export const follow = async (_:any, { followedUser }, context:any) => {
    try {
        const user:any = Authenticate(context)

        const alreadyFollowed = await FollowModel.findOne({followedUser, followedBy: user.user._id});

        if(alreadyFollowed) {
            throw new Error("You have already followed this user");
        }

        if(user.user._id === followedUser) {
            throw new Error("You cannot follow yourself");
        }

        const follow = new FollowModel({
            followedBy: user.user._id,
            followedUser,
            followedAt: new Date().toISOString(),
        })

        const followResult = await follow.save();

        return followResult;

    } catch (error) {
        console.log(error);
    }
}

export const unfollow = async (_:any, { followedUser }, context:any) => {
    
}

export const becomePremiumUser = async (_:any, __:any, context:any) => {
    try {
        const user: any = Authenticate(context);

        const getUserFromDB = await UserModel.findById(user.user._id)

        if (getUserFromDB.subscription === "PREMIUM") {
            throw new Error("You are already a premium user");
        }

        const updateUser = await UserModel.findByIdAndUpdate(user.user._id, {subscription: "PREMIUM"}, {new: true});

        return updateUser;
    } catch (error) {
        console.log(error);
    }

}   

export const becomeCreator = async (_:any, __:any, context:any) => {
    try {
        const user: any = Authenticate(context);

        const getUserFromDB = await UserModel.findById(user.user._id)

        if (getUserFromDB.subscription !== "PREMIUM") {
            throw new Error("You are not a premium user");
        }
        
        if (getUserFromDB.userType === "CREATOR") {
            throw new Error("You are already a creater");
        }

        const updateUser = await UserModel.findByIdAndUpdate(user.user._id, {userType: "CREATOR"}, {new: true});

        return updateUser;
    } catch (error) {
        console.log(error);
    }
}