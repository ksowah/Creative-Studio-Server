import jwt from 'jsonwebtoken';
import { User } from '../types';

export const __GENERATE_TOKEN = (user: User) => {
    return jwt.sign({user}, process.env.JWT_SECRET, { expiresIn: '4h' });
}


