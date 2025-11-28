import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'supersecret';


export const generateAccessToken = (payload) => {
    return jwt.sign(payload, SECRET, { expiresIn: '1h' });
};

export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token) => {
    return jwt.verify(token, SECRET);
};