import { listUsers as listUsersService, deleteUser as deleteUserService } from '../services/user.js';

const listUsers = async (req, res) => {
    const users = await listUsersService();
    return res.status(200).json(users);
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await deleteUserService(id);
    return res.status(200).json(user);
};

export { listUsers, deleteUser };