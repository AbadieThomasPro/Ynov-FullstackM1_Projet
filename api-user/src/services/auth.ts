import bcrypt from 'bcrypt';
import { getUserByEmail } from '../models/user.js';

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
    return user;
};