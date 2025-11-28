import bcrypt from 'bcrypt';
import { getUserByEmail, getUserById } from '../models/user.js';
import { generateRefreshToken, generateAccessToken } from '../utils/jwt.js';
import { verifyToken } from '../utils/jwt.js';

export const register = async (email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return { email, password: hashedPassword };
};

export const login = async (email: string, password: string) => {
    const user = await getUserByEmail(email);
    if (!user) {
        return null;
    }
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
        return null;
    }

    const accessToken = generateAccessToken({ id: user.id, email: user.email }); 
    
    
    const refreshToken = generateRefreshToken({ id: user.id, email: user.email });
    return { accessToken, refreshToken, user };
};

export const refreshToken = async (token) => {
    const decoded = verifyToken(token);
    if (!decoded) {
        return null;
    }
    const user = await getUserById(decoded.id);
    if (!user) {
        return null;
    }
    const newToken = generateAccessToken({ id: user.id, email: user.email });
    return { token: newToken, user };
};