import { verifyToken } from '../utils/jwt.js';

const authMiddleware = (req, res, next) => {
    const  authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid token' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next()
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

export { authMiddleware };