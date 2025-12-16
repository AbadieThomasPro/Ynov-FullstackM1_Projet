import { Router } from "express";
import { helloController } from "../controllers/recipe.js";

const recipeRouter = Router();

/**
 * @openapi
 * /recipe/hello:
 *   get:
 *     summary: Retourne un message de test
 *     description: Teste l'API Recipe en renvoyant un message simple.
 *     responses:
 *       200:
 *         description: Message de succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hello from Recipe API!"
 */
recipeRouter.get("/hello", helloController);

export default recipeRouter;