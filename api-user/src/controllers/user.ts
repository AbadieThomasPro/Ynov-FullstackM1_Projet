import type { Request, Response } from 'express';
import { listUsersService, deleteUserService, testApiUserService, getUserByIdService } from '../services/user.js';

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

const getUserByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'id param is required' });
    const user = await getUserByIdService(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json(user);
}

export { listUsersController, deleteUserController, testApiUserController, getUserByIdController };