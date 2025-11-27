import { createUser as createUserService } from '../services/user.js';
import { login as loginService } from '../services/auth.js';

export const register = async (req, res) => {
    console.log('REGISTER');
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    const result = await createUserService(email, password);

    return res.status(201).json(result);
};

export const login = async (req, res) => {
    // res.send('Login');
    const { email, password } = req.body;

    const result = await loginService(email, password)
    // const valid = await bcrypt.compare(password, user.password_hash);
    // if (!valid) {
    //     return res.status(401).json({ error: 'Invalid email or password' });
    // }
    if (!result) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    // const token = generateToken({ userId: result.id });
    console.log('LOGIN SUCCESSFUL');
    return res.status(200).json({ message: 'Login successful' });

};