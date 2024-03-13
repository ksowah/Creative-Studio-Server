import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000; 

export const config = {
    server: {
        port: PORT
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET
    },
    db: {
        mongoURI: process.env.MONGO_URI
    },
    paystack: {
        secretKey: process.env.PAYSTACK_SECRET
    },
    environment: process.env.NODE_ENV
}