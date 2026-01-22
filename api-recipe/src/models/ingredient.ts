import pool from '../config/db.js';

export type Ingredient = {
  ingredientid: string;
  ingredientname: string;
  ingredientcategoryid: string | null;
  costestimate: number | null;
  origin: string | null;
  isvegan: boolean | null;
  isvegetarian: boolean | null;
  isallergen: boolean | null;
  storageadvice: string | null;
  description: string | null;
};

export const getAllIngredientsQuery = async () => {
  const result = await pool.query(
    `SELECT ingredientid, ingredientname, ingredientcategoryid, costestimate, origin, isvegan, isvegetarian, isallergen, storageadvice, description FROM ingredients`);
  return result.rows as Ingredient[];
};

export const getIngredientByIdQuery = async (id: string) => {
  const result = await pool.query(
    `SELECT ingredientid, ingredientname, ingredientcategoryid, costestimate, origin, isvegan, isvegetarian, isallergen, storageadvice, description FROM ingredients WHERE ingredientid = $1`,
    [id]
  );
  return result.rows[0] as Ingredient | undefined;
};
