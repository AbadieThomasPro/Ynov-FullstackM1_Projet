import { Router } from "express";
import { helloController } from "../controllers/recipe.js";
import { getAllRecipesController, getRecipeByIdController, createRecipeController, updateRecipeController, deleteRecipeController, addRecipeIngredientsController, addRecipeStepsController } from '../controllers/recipe.js';
import { addStepImagesController } from '../controllers/image.js';

const recipeRouter = Router();


/**
 * @openapi
 * /recipe/hello:
 *   get:
 *     tags:
 *       - Recipe
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

/**
 * @openapi
 * /recipe:
 *   get:
 *     tags:
 *       - Recipe
 *     summary: Récupère toutes les recettes
 *     description: Retourne la liste complète des recettes disponibles
 *     responses:
 *       200:
 *         description: Liste des recettes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   recipeid:
 *                     type: string
 *                   name:
 *                     type: string
 *                   userid:
 *                     type: string
 *                   description:
 *                     type: string
 *                   servings:
 *                     type: integer
 *                   preperationtime:
 *                     type: integer
 *                   cooktime:
 *                     type: integer
 *                   totaltime:
 *                     type: integer
 *                   difficulty:
 *                     type: string
 *                   createdat:
 *                     type: string
 *                     format: date-time
 */
recipeRouter.get('/', getAllRecipesController);

/**
 * @openapi
 * /recipe/{id}:
 *   get:
 *     tags:
 *       - Recipe
 *     summary: Récupère une recette par son ID
 *     description: Retourne les détails d'une recette spécifique
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID de la recette
 *     responses:
 *       200:
 *         description: Détails de la recette
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recipeid:
 *                   type: string
 *                 name:
 *                   type: string
 *                 userid:
 *                   type: string
 *                 description:
 *                   type: string
 *                 servings:
 *                   type: integer
 *                 preperationtime:
 *                   type: integer
 *                 cooktime:
 *                   type: integer
 *                 totaltime:
 *                   type: integer
 *                 difficulty:
 *                   type: string
 *                 createdat:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: ID manquant
 *       404:
 *         description: Recette non trouvée
 */
recipeRouter.get('/:id', getRecipeByIdController);

/**
 * @openapi
 * /recipe:
 *   post:
 *     tags:
 *       - Recipe
 *     summary: Crée une nouvelle recette
 *     description: Insère une nouvelle recette dans la base de données
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - userid
 *             properties:
 *               name:
 *                 type: string
 *               userid:
 *                 type: string
 *               description:
 *                 type: string
 *               servings:
 *                 type: integer
 *               preperationTime:
 *                 type: integer
 *               cookTime:
 *                 type: integer
 *               totalTime:
 *                 type: integer
 *               difficulty:
 *                 type: string
 *                 enum: [Facile, Moyen, Difficile]
 *     responses:
 *       201:
 *         description: Recette créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recipeid:
 *                   type: string
 *                 name:
 *                   type: string
 *                 userid:
 *                   type: string
 *                 createdat:
 *                   type: string
 *                   format: date-time
 */
recipeRouter.post('/', createRecipeController);

/**
 * @openapi
 * /recipe/{id}:
 *   put:
 *     tags:
 *       - Recipe
 *     summary: Met à jour une recette
 *     description: Modifie les informations d'une recette existante
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID de la recette
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               servings:
 *                 type: integer
 *               preperationTime:
 *                 type: integer
 *               cookTime:
 *                 type: integer
 *               totalTime:
 *                 type: integer
 *               difficulty:
 *                 type: string
 *     responses:
 *       200:
 *         description: Recette mise à jour avec succès
 *       400:
 *         description: ID manquant
 *       404:
 *         description: Recette non trouvée ou aucune modification
 */
recipeRouter.put('/:id', updateRecipeController);

/**
 * @openapi
 * /recipe/{id}:
 *   delete:
 *     tags:
 *       - Recipe
 *     summary: Supprime une recette
 *     description: Supprime définitivement une recette de la base de données
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID de la recette
 *     responses:
 *       200:
 *         description: Recette supprimée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 row:
 *                   type: object
 *       400:
 *         description: ID manquant
 *       404:
 *         description: Recette non trouvée
 */
recipeRouter.delete('/:id', deleteRecipeController);

/**
 * @openapi
 * /recipe/{id}/ingredients:
 *   post:
 *     tags:
 *       - Ingredients
 *     summary: Ajoute des ingrédients à une recette
 *     description: Insère plusieurs ingrédients pour une recette donnée dans la table recipe_ingredients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID de la recette
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ingredientId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     quantityUnit:
 *                       type: string
 *                     order:
 *                       type: integer
 *                     optional:
 *                       type: boolean
 *     responses:
 *       201:
 *         description: Ingrédients ajoutés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ingredientId:
 *                     type: string
 *                   inserted:
 *                     type: boolean
 *       400:
 *         description: Requête invalide
 *       500:
 *         description: Erreur serveur
 */
recipeRouter.post('/:id/ingredients', addRecipeIngredientsController);

/**
 * @openapi
 * /recipe/{id}/steps:
 *   post:
 *     tags:
 *       - Recipe Steps
 *     summary: Ajoute des étapes à une recette
 *     description: Insère plusieurs étapes pour une recette donnée dans la table recipe_steps
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID de la recette
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               steps:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     stepIndex:
 *                       type: integer
 *                     description:
 *                       type: string
 *                     duration:
 *                       type: integer
 *                       nullable: true
 *                     tips:
 *                       type: object
 *                       nullable: true
 *     responses:
 *       201:
 *         description: Étapes ajoutées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   stepIndex:
 *                     type: integer
 *                   inserted:
 *                     type: boolean
 *       400:
 *         description: Requête invalide
 *       500:
 *         description: Erreur serveur
 */
recipeRouter.post('/:id/steps', addRecipeStepsController);

/**
 * @openapi
 * /recipe/{id}/images:
 *   post:
 *     tags:
 *       - Images
 *     summary: Ajoute des images aux étapes d'une recette
 *     description: Insère plusieurs images pour les étapes d'une recette dans la table images
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID de la recette
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     stepId:
 *                       type: string
 *                     image:
 *                       type: object
 *                       description: Image data as JSONB
 *                     order:
 *                       type: integer
 *                     alt_text:
 *                       type: string
 *     responses:
 *       201:
 *         description: Images ajoutées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   alt_text:
 *                     type: string
 *                   inserted:
 *                     type: boolean
 *       400:
 *         description: Requête invalide
 *       500:
 *         description: Erreur serveur
 */
recipeRouter.post('/:id/images', addStepImagesController);

export default recipeRouter;