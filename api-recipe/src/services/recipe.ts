
import { findAllRecipes, findRecipeById, insertRecipe, deleteRecipeById, updateRecipeById } from '../models/recipe.js';

export const helloService = () => {
  return "Hello from Recipe API!";
};

export const getAllRecipes = async () => {
  return await findAllRecipes();
};

export const getRecipeById = async (id: string) => {
  return await findRecipeById(id);
};

export const createRecipe = async (data: any) => {
  return await insertRecipe(data);
};

export const updateRecipe = async (id: string, data: any) => {
  return await updateRecipeById(id, data);
};

export const deleteRecipe = async (id: string) => {
  return await deleteRecipeById(id);
};