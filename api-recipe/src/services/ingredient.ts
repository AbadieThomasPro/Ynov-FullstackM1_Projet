import { getAllIngredientsQuery, getIngredientByIdQuery } from '../models/ingredient.js';

export const getAllIngredientsService = async () => {
  return await getAllIngredientsQuery();
};

export const getIngredientByIdService = async (id: string) => {
  return await getIngredientByIdQuery(id);
};
