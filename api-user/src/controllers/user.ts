import type { Request, Response } from 'express';
import { listUsers as listUsersModel, deleteUser as deleteUserModel, getUserById as getUserByIdModel } from '../models/user.js';

/**
 * List all users
 * GET /user
 */
const listUsersController = async (req: Request, res: Response) => {
    const users = await listUsersModel();
    return res.status(200).json(users);
};

/**
 * Delete user by ID
 * DELETE /user/:id
 */
const deleteUserController = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'id param is required' });
    const user = await deleteUserModel(id);
    return res.status(200).json(user);
};

/**
 * Test API user endpoint
 * GET /user/test
 */
const testApiUserController = (_req: Request, res: Response) => {
    const result = "Réponses test api-user";
    return res.status(200).json(result);
}

/**
 * Get user by ID
 * GET /user/:id
 */
const getUserByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'id param is required' });
    const user = await getUserByIdModel(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json(user);
}

export { listUsersController, deleteUserController, testApiUserController, getUserByIdController };