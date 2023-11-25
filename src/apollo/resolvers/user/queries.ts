import Authenticate from '../../../middleware/auth';

export async function getMe(_: any, __: any, context: any) {
    try {
        const user = Authenticate(context)

        console.log("user >>", user);
        

        return user;
    } catch (err) {
        throw new Error(err);
    }
}




