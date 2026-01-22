import type { Request, Response } from 'express';
import { getAllIngredientsService, getIngredientByIdService } from '../services/ingredient.js';

export const getAllIngredientsController = async (_req: Request, res: Response) => {
  const rows = await getAllIngredientsService();
  res.status(200).json(rows);
};

export const getIngredientByIdController = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: 'Missing id param' });
  const row = await getIngredientByIdService(id);
  if (!row) return res.status(404).json({ message: 'Ingredient not found' });
  res.status(200).json(row);
};
