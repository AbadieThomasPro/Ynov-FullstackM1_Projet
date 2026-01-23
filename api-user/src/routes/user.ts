import { listUsersController, deleteUserController, testApiUserController, getUserByIdController } from '../controllers/user.js';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.js';

const userRouter = Router();

/**
 * @openapi
 * /user/:
 *   get:
 *     tags:
 *       - User
 *     summary: Liste tous les utilisateurs
 *     description: Retourne un tableau d'utilisateurs (sans pagination, ni filtre).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
userRouter.get('/', authMiddleware, listUsersController);

/**
 * @openapi
 * /user/{id}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Supprime un utilisateur par ID
 *     description: Supprime l'utilisateur correspondant à l'ID fourni. Retourne l'utilisateur supprimé ou une erreur si non trouvé.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur à supprimer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: id param is required
 *       404:
 *         description: Utilisateur non trouvé
 */
userRouter.delete('/:id', authMiddleware, deleteUserController);

/**
 * @openapi
 * /user/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Récupère un utilisateur par ID
 *     description: Retourne les données complètes d'un utilisateur.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Utilisateur non trouvé
 */
userRouter.get('/:id', authMiddleware, getUserByIdController);

/**
 * @openapi
 * /user/test:
 *   get:
 *     tags:
 *       - User
 *     summary: Teste l'API User
 *     description: Retourne une chaîne de caractères pour tester l'API user.
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Réponses test api-user"
 */
userRouter.get('/test', testApiUserController );

export default userRouter;