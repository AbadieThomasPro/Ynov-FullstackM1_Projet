import type { Request, Response } from "express";
import { helloService, getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe, addRecipeIngredients, addRecipeSteps } from "../services/recipe.js";

/**
 * Test endpoint
 * GET /recipe/hello
 */
export const helloController = (_req: Request, res: Response) => {
  const message = helloService();
  res.status(200).json({ message });
};

/**
 * Get all recipes
 * GET /recipe
 */
export const getAllRecipesController = async (_req: Request, res: Response) => {
  const rows = await getAllRecipes();
  res.status(200).json(rows);
};

/**
 * Get recipe by ID
 * GET /recipe/:id
 */
export const getRecipeByIdController = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: 'Missing id' });
  const row = await getRecipeById(id);
  if (!row) return res.status(404).json({ message: 'Not found' });
  res.status(200).json(row);
};

/**
 * Create a new recipe
 * POST /recipe
 * Body: { name, userid, description, servings, preperationTime, cookTime, totalTime, difficulty }
 */
export const createRecipeController = async (req: Request, res: Response) => {
  const data = req.body;
  const row = await createRecipe(data);
  res.status(201).json(row);
};

/**
 * Update a recipe
 * PUT /recipe/:id
 * Body: { name?, description?, servings?, preperationTime?, cookTime?, totalTime?, difficulty? }
 */
export const updateRecipeController = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: 'Missing id' });
  const data = req.body;
  const row = await updateRecipe(id, data);
  if (!row) return res.status(404).json({ message: 'Not found or nothing to update' });
  res.status(200).json(row);
};

/**
 * Delete a recipe
 * DELETE /recipe/:id
 */
export const deleteRecipeController = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: 'Missing id' });
  const row = await deleteRecipe(id);
  if (!row) return res.status(404).json({ message: 'Not found' });
  res.status(200).json({ message: 'Deleted', row });
};

/**
 * Add ingredients to a recipe
 * POST /recipe/:id/ingredients
 * Body: { ingredients: [{ingredientId, quantity, quantityUnit, order, optional}] }
 */
export const addRecipeIngredientsController = async (req: Request, res: Response) => {
  const recipeId = req.params.id;
  const { ingredients } = req.body;
  
  if (!recipeId) return res.status(400).json({ message: 'Missing recipeId' });
  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ message: 'Missing or invalid ingredients array' });
  }
  
  try {
    const results = await addRecipeIngredients(recipeId, ingredients);
    res.status(201).json(results);
  } catch (error) {
    console.error('Error adding recipe ingredients:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Add steps to a recipe
 * POST /recipe/:id/steps
 * Body: { steps: [{stepIndex, description, duration, tips}] }
 */
export const addRecipeStepsController = async (req: Request, res: Response) => {
  const recipeId = req.params.id;
  const { steps } = req.body;
  
  if (!recipeId) return res.status(400).json({ message: 'Missing recipeId' });
  if (!steps || !Array.isArray(steps) || steps.length === 0) {
    return res.status(400).json({ message: 'Missing or invalid steps array' });
  }
  
  try {
    const results = await addRecipeSteps(recipeId, steps);
    res.status(201).json(results);
  } catch (error) {
    console.error('Error adding recipe steps:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};