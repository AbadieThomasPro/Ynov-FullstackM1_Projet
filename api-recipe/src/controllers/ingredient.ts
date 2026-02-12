import type { Request, Response } from 'express';
import { getAllIngredientsQuery as getAllIngredientsModel, getIngredientByIdQuery as getIngredientByIdModel, searchIngredientsQuery as searchIngredientsModel } from '../models/ingredient.js';

/**
 * Get all ingredients
 * GET /recipe/ingredients
 */
export const getAllIngredientsController = async (_req: Request, res: Response) => {
  const rows = await getAllIngredientsModel();
  res.status(200).json(rows);
};

/**
 * Get ingredient by ID
 * GET /recipe/ingredients/:id
 */
export const getIngredientByIdController = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: 'Missing id param' });
  const row = await getIngredientByIdModel(id);
  if (!row) return res.status(404).json({ message: 'Ingredient not found' });
  res.status(200).json(row);
};

/**
 * Search ingredients by name
 * GET /recipe/ingredients/search?q=term
 */
export const searchIngredientsController = async (req: Request, res: Response) => {
  const q = (req.query.q as string) || '';
  if (!q) return res.status(400).json({ message: 'Missing query param q' });
  const rows = await searchIngredientsModel(q);
  res.status(200).json(rows);
};
