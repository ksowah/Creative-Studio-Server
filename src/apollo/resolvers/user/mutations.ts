import bcrypt from 'bcryptjs';
import { UserModel } from '../../../models/User';
import { __GENERATE_TOKEN } from '../../../utils/functions';
import { User } from '../../../types';


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