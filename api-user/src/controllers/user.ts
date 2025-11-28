import type { Request, Response } from 'express';
import { listUsersService, deleteUserService, testApiUserService } from '../services/user.js';

const listUsersController = async (req: Request, res: Response) => {
    const users = await listUsersService();
    return res.status(200).json(users);
};

const deleteUserController = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'id param is required' });
    const user = await deleteUserService(id);
    return res.status(200).json(user);
};

const testApiUserController = async (req: Request, res: Response) => {
    const result = await testApiUserService();
    return res.status(200).json(result);
}

export { listUsersController, deleteUserController, testApiUserController };