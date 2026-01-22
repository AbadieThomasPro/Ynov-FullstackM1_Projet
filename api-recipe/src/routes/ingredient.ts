import { Router } from 'express';
import { getAllIngredientsController, getIngredientByIdController, searchIngredientsController } from '../controllers/ingredient.js';

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
/**
 * @openapi
 * /recipe/ingredients/search:
 *   get:
 *     summary: Recherche d'ingrédients par nom (query param `q`)
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Terme de recherche (min 2 caractères)
 *     responses:
 *       200:
 *         description: Liste d'ingrédients correspondant au terme
 *       400:
 *         description: Paramètre q manquant
 */
ingredientRouter.get('/search', searchIngredientsController);
ingredientRouter.get('/search', searchIngredientsController);
/**
 * @openapi
 * /recipe/ingredients/{id}:
 *   get:
 *     summary: Retourne un ingrédient par son id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID de l'ingrédient
 *     responses:
 *       200:
 *         description: Détails de l'ingrédient
 *       400:
 *         description: Paramètre id manquant
 *       404:
 *         description: Ingrédient non trouvé
 */
ingredientRouter.get('/:id', getIngredientByIdController);

export default ingredientRouter;
