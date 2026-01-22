import type { Request, Response } from "express";
import { helloService, getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe } from "../services/recipe.js";

export const helloController = (_req: Request, res: Response) => {
  const message = helloService();
  res.status(200).json({ message });
};

export const getAllRecipesController = async (_req: Request, res: Response) => {
  const rows = await getAllRecipes();
  res.status(200).json(rows);
};

export const getRecipeByIdController = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: 'Missing id' });
  const row = await getRecipeById(id);
  if (!row) return res.status(404).json({ message: 'Not found' });
  res.status(200).json(row);
};

export const createRecipeController = async (req: Request, res: Response) => {
  const data = req.body;
  const row = await createRecipe(data);
  res.status(201).json(row);
};

export const updateRecipeController = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: 'Missing id' });
  const data = req.body;
  const row = await updateRecipe(id, data);
  if (!row) return res.status(404).json({ message: 'Not found or nothing to update' });
  res.status(200).json(row);
};

export const deleteRecipeController = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: 'Missing id' });
  const row = await deleteRecipe(id);
  if (!row) return res.status(404).json({ message: 'Not found' });
  res.status(200).json({ message: 'Deleted', row });
};