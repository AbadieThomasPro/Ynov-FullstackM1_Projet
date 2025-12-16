import type { Request, Response } from 'express';
import { createUser as createUserService } from '../services/user.js';
import { login as loginService } from '../services/auth.js';
import { refreshToken as refreshTokenService } from '../services/auth.js';

export const register = async (req: Request, res: Response) => {
    const { email, password, pseudo } = req.body as { email?: string; password?: string; pseudo?: string };

    if (!email || !password || !pseudo) {
        return res.status(400).json({ error: 'Email, password and pseudo are required' });
    }
    const createdUser = await createUserService(email, password, pseudo);
    if (!createdUser) {
        return res.status(400).json({ error: 'Failed to create user' });
    }
    const result = await loginService(email, password);
    if (!result) return res.status(500).json({ error: 'Failed to login after register' });
    return res.status(201).json({ accessToken: result.accessToken, email: result.user.email });
};

export const refreshToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.body as { refreshToken?: string };
    if (!refreshToken) {
        return res.status(400).json({ error: 'refreshToken is required' });
    }
    const result = await refreshTokenService(refreshToken);
    if (!result) return res.status(401).json({ error: 'Invalid refresh token' });
    return res.status(200).json({ accessToken: result.accessToken, email: result.user.email });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body as { email?: string; password?: string };

    const result = await loginService(email ?? '', password ?? '');
    if (!result) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    console.log('LOGIN SUCCESSFUL');

    // set refresh token cookie if present
    if (result.refreshToken) {
        // In development, secure should be false when not using HTTPS
        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }

    return res.status(200).json({ accessToken: result.accessToken, email: result.user.email });
};