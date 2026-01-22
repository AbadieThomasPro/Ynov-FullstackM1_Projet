import { Router } from 'express';
import { getAllIngredientsController, getIngredientByIdController } from '../controllers/ingredient.js';

const ingredientRouter = Router();

/**
 * @openapi
 * /recipe/ingredients:
 *   get:
 *     summary: Retourne la liste des ingrédients
 *     responses:
 *       200:
 *         description: Liste d'ingrédients
 */
ingredientRouter.get('/', getAllIngredientsController);
ingredientRouter.get('/:id', getIngredientByIdController);

export default ingredientRouter;
