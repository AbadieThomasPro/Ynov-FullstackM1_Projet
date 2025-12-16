import { Router } from 'express';
import { register, login } from '../controllers/auth.js';

const authRouter = Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Authentification utilisateur
 *     description: Authentifie un utilisateur et retourne un accessToken JWT (et un refreshToken en cookie).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@email.com
 *               password:
 *                 type: string
 *                 example: motdepasse
 *     responses:
  *       200:
 *         description: Authentification réussie, retourne un accessToken et l'email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Email ou mot de passe invalide
 */
authRouter.post('/login', login);

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Inscription utilisateur
 *     description: Crée un nouvel utilisateur et retourne un accessToken JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - pseudo
 *             properties:
 *               email:
 *                 type: string
 *                 example: newuser@email.com
 *               password:
 *                 type: string
 *                 example: motdepasse
 *               pseudo:
 *                 type: string
 *                 example: user
 *     responses:
 *       201:
 *         description: Utilisateur créé et authentifié, retourne un accessToken et l'email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
  *               properties:
 *                 accessToken:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Email et mot de passe requis ou création impossible
 */
authRouter.post('/register' , register);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Déconnexion utilisateur
 *     description: Déconnecte l'utilisateur (stateless, ne fait qu'un retour simple).
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Logout
 */
authRouter.post('/logout', (req, res) => {
    res.send('Logout');
});


export default authRouter;