import { Router } from "express";
import { helloController } from "../controllers/recipe.js";

const recipeRouter = Router();

import { getAllRecipesController, getRecipeByIdController, createRecipeController, updateRecipeController, deleteRecipeController } from '../controllers/recipe.js';

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
// CRUD
recipeRouter.get('/', getAllRecipesController);
recipeRouter.get('/:id', getRecipeByIdController);
recipeRouter.post('/', createRecipeController);
recipeRouter.put('/:id', updateRecipeController);
recipeRouter.delete('/:id', deleteRecipeController);

export default recipeRouter;