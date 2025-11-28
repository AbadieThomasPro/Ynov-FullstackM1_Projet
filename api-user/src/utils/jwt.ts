import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_ACCESS_SECRET || 'supersecret';

export const generateAccessToken = (payload: Record<string, any>): string => {
    return jwt.sign(payload, SECRET, { expiresIn: '1h' });
};

export const generateRefreshToken = (payload: Record<string, any>): string => {
    return jwt.sign(payload, SECRET, { expiresIn: '7d' });
};

// verifyToken returns the decoded payload or null if invalid
export const verifyToken = (token: string): jwt.JwtPayload | string | null => {
    try {
        return jwt.verify(token, SECRET);
    } catch (err) {
        return null;
    }
};