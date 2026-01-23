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

/**
 * Get all ingredients
 * @returns Array of all ingredients
 */
export const getAllIngredientsQuery = async () => {
  const result = await pool.query(
    `SELECT ingredientid, ingredientname, ingredientcategoryid, costestimate, origin, isvegan, isvegetarian, isallergen, storageadvice, description FROM ingredients`);
  return result.rows as Ingredient[];
};

/**
 * Get ingredient by ID
 * @param id - Ingredient UUID
 * @returns Ingredient object or undefined
 */
export const getIngredientByIdQuery = async (id: string) => {
  const result = await pool.query(
    `SELECT ingredientid, ingredientname, ingredientcategoryid, costestimate, origin, isvegan, isvegetarian, isallergen, storageadvice, description FROM ingredients WHERE ingredientid = $1`,
    [id]
  );
  return result.rows[0] as Ingredient | undefined;
};

/**
 * Search ingredients by name
 * @param q - Search query string
 * @returns Array of matching ingredients (max 50 results)
 */
export const searchIngredientsQuery = async (q: string) => {
  const term = `%${q}%`;
  const result = await pool.query(
    `SELECT ingredientid, ingredientname, ingredientcategoryid, costestimate, origin, isvegan, isvegetarian, isallergen, storageadvice, description FROM ingredients WHERE ingredientname ILIKE $1 LIMIT 50`,
    [term]
  );
  return result.rows as Ingredient[];
};
