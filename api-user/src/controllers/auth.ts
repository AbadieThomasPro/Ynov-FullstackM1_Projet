import { createUser as createUserService } from '../services/user.js';
import { login as loginService } from '../services/auth.js';
import { refreshToken as refreshTokenService } from '../services/auth.js';

export const register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    const createdUser = await createUserService(email, password);
    if (!createdUser) {
        return res.status(400).json({ error: 'Failed to create user' });
    }
    const result = await loginService(email, password)
    return res.status(201).json({token:result.token, email: result.user.email});
};

export const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({ error: 'refreshToken is required' });
    }
    const result = await refreshTokenService(refreshToken);
    return res.status(200).json({ token: result.token, email: result.user.email });
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
    // const token = generateAccessToken({ userId: result.id });
    console.log('LOGIN SUCCESSFUL');
  
    return res
    .status(200)
    .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
    .json({ accessToken: result.accessToken, email: result.user.email });

};