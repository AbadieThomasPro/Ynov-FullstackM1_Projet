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
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return null;
    }

    const accessToken = generateAccessToken({ id: user.userId, email: user.email });
    const refreshToken = generateRefreshToken({ id: user.userId, email: user.email });
    return { accessToken, refreshToken, user };
};

export const refreshToken = async (token: string) => {
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string') {
        return null;
    }
    const user = await getUserById((decoded as any).id);
    if (!user) {
        return null;
    }
    const newAccessToken = generateAccessToken({ id: user.userId, email: user.email });
    return { accessToken: newAccessToken, user };
};