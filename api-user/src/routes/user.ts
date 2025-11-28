import { listUsers as listUsersController, deleteUser as deleteUserController } from '../controllers/user.js';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.js';

const userRouter = Router();

userRouter.get('/', authMiddleware, listUsersController);

userRouter.delete('/:id', authMiddleware, deleteUserController);

export default userRouter;