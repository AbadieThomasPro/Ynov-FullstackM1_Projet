import { Router } from 'express';
import { register, login } from '../controllers/auth.js';

const router = Router();

router.post('/login', login);

router.post('/register', register);

router.post('/logout', (req, res) => {
    res.send('Logout');
});


export default router;