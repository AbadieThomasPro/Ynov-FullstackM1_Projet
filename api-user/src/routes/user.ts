import { listUsersController, deleteUserController, testApiUserController } from '../controllers/user.js';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.js';

const userRouter = Router();

userRouter.get('/', authMiddleware, listUsersController);

userRouter.delete('/:id', authMiddleware, deleteUserController);

userRouter.get('/test', testApiUserController );

export default userRouter;