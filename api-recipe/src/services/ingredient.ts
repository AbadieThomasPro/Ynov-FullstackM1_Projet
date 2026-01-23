import { getAllIngredientsQuery, getIngredientByIdQuery, searchIngredientsQuery } from '../models/ingredient.js';

export const getAllIngredientsService = async () => {
  return await getAllIngredientsQuery();
};

export const getIngredientByIdService = async (id: string) => {
  return await getIngredientByIdQuery(id);
};

export const searchIngredientsService = async (q: string) => {
  return await searchIngredientsQuery(q);
};
