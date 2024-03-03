import jwt from 'jsonwebtoken';

const Authenticate = (context:any) => {
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, process.env.JWT_SECRET);
                return user;
            } catch (error) {
                throw new Error("Your session has expired");
            }
        }

        throw new Error("Authentication token must be bearer token");
    }
    throw new Error("You are not Authorized to perform this action");
}

export default Authenticate;