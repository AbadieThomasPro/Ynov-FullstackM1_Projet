import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';

interface AuthRequest extends Request {
    user?: any;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid token' });
    }
    const token = authHeader.split(' ')[1] as string;
    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = decoded;
    return next();
};

export { authMiddleware };