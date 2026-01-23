
import { findAllRecipes, findRecipeById, insertRecipe, deleteRecipeById, updateRecipeById, insertRecipeIngredient, insertRecipeStep } from '../models/recipe.js';

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

/**
 * Insert multiple recipe ingredients
 * @param recipeId - Recipe UUID
 * @param ingredients - Array of ingredient data
 * @returns Array of results with ingredientId and insert status
 */
export const addRecipeIngredients = async (recipeId: string, ingredients: any[]) => {
  const results = [];
  
  for (const ingredient of ingredients) {
    const { ingredientId, quantity, quantityUnit, order, optional = false } = ingredient;
    
    const inserted = await insertRecipeIngredient(
      recipeId,
      ingredientId,
      quantity,
      quantityUnit,
      order,
      optional
    );
    
    results.push({
      ingredientId,
      inserted: inserted !== null
    });
  }
  
  return results;
};

/**
 * Insert multiple recipe steps
 * @param recipeId - Recipe UUID
 * @param steps - Array of step data
 * @returns Array of results with stepIndex, stepId and insert status
 */
export const addRecipeSteps = async (recipeId: string, steps: any[]) => {
  const results = [];
  
  for (const step of steps) {
    const { stepIndex, description, duration = null, tips = null } = step;
    
    const inserted = await insertRecipeStep(
      recipeId,
      stepIndex,
      description,
      duration,
      tips
    );
    
    results.push({
      stepIndex,
      stepId: inserted?.stepid || null,
      inserted: inserted !== null
    });
  }
  
  return results;
};