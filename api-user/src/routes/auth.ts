import { Router } from 'express';
import { register, login } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/login', login);

authRouter.post('/register' , register);

authRouter.post('/logout', (req, res) => {
    res.send('Logout');
});


export default authRouter;