import pool from '../config/db.js';

/**
 * Get all recipes
 * @returns Array of all recipes ordered by creation date
 */
export const findAllRecipes = async () => {
  const res = await pool.query('SELECT * FROM recipes ORDER BY createdat DESC');
  return res.rows;
};

/**
 * Get recipe by ID
 * @param id - Recipe UUID
 * @returns Recipe object or undefined
 */
export const findRecipeById = async (id: string) => {
  const res = await pool.query('SELECT * FROM recipes WHERE recipeid = $1', [id]);
  return res.rows[0];
};

/**
 * Insert a new recipe
 * @param data - Recipe data object
 * @param data.name - Recipe name
 * @param data.userid - User UUID
 * @param data.description - Recipe description
 * @param data.servings - Number of servings
 * @param data.preperationTime - Preparation time in minutes
 * @param data.cookTime - Cooking time in minutes
 * @param data.totalTime - Total time in minutes
 * @param data.difficulty - Difficulty level (Facile, Moyen, Difficile)
 * @returns Inserted recipe with generated ID
 */
export const insertRecipe = async (data: any) => {
  const { 
    name, 
    userid, 
    description, 
    servings, 
    preperationTime, 
    cookTime, 
    totalTime, 
    difficulty 
  } = data;
  
  const res = await pool.query(
    `INSERT INTO recipes (
      name, 
      userid, 
      description, 
      servings, 
      preperationtime, 
      cooktime, 
      totaltime, 
      difficulty, 
      createdat
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) RETURNING *`,
    [name, userid, description, servings, preperationTime, cookTime, totalTime, difficulty]
  );
  return res.rows[0];
};

/**
 * Delete a recipe by ID
 * @param id - Recipe UUID
 * @returns Deleted recipe object or undefined
 */
export const deleteRecipeById = async (id: string) => {
  const res = await pool.query('DELETE FROM recipes WHERE recipeid = $1 RETURNING *', [id]);
  return res.rows[0];
};

/**
 * Update a recipe by ID
 * @param id - Recipe UUID
 * @param patch - Object with fields to update
 * @returns Updated recipe object or null if no fields to update
 */
export const updateRecipeById = async (id: string, patch: Record<string, any>) => {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;
  for (const key of Object.keys(patch)) {
    fields.push(`${key} = $${idx}`);
    values.push(patch[key]);
    idx++;
  }
  if (fields.length === 0) return null;
  values.push(id);
  const q = `UPDATE recipes SET ${fields.join(', ')}, updatedat = now() WHERE recipeid = $${idx} RETURNING *`;
  const res = await pool.query(q, values);
  return res.rows[0];
};

/**
 * Get all ingredients for a recipe (with ingredient names)
 * @param recipeId - Recipe UUID
 * @returns Array of recipe ingredients with ingredient details
 */
export const findRecipeIngredients = async (recipeId: string) => {
  const res = await pool.query(
    `SELECT ri.*, i.ingredientname as name
     FROM recipe_ingredients ri 
     JOIN ingredients i ON ri.ingredientid = i.ingredientid 
     WHERE ri.recipeid = $1 
     ORDER BY ri."order"`,
    [recipeId]
  );
  return res.rows;
};

/**
 * Get all steps for a recipe
 * @param recipeId - Recipe UUID
 * @returns Array of recipe steps ordered by stepIndex
 */
export const findRecipeSteps = async (recipeId: string) => {
  const res = await pool.query(
    `SELECT * FROM recipe_steps WHERE recipeid = $1 ORDER BY stepindex`,
    [recipeId]
  );
  return res.rows;
};

/**
 * Get all images for a recipe
 * @param recipeId - Recipe UUID
 * @returns Array of recipe images ordered by order
 */
export const findRecipeImages = async (recipeId: string) => {
  const res = await pool.query(
    `SELECT * FROM images WHERE recipeid = $1 ORDER BY "order"`,
    [recipeId]
  );
  return res.rows;
};

/**
 * Insert a recipe ingredient
 * @param recipeId - Recipe UUID
 * @param ingredientId - Ingredient UUID
 * @param quantity - Quantity value
 * @param quantityUnit - Unit of measurement
 * @param order - Display order
 * @param optional - Whether ingredient is optional
 * @returns Inserted row or null on error
 */
export const insertRecipeIngredient = async (
  recipeId: string,
  ingredientId: string,
  quantity: number,
  quantityUnit: string,
  order: number,
  optional: boolean = false
) => {
  try {
    const res = await pool.query(
      `INSERT INTO recipe_ingredients (recipeid, ingredientid, quantity, quantityunit, "order", optional) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [recipeId, ingredientId, quantity, quantityUnit, order, optional]
    );
    return res.rows[0];
  } catch (error) {
    console.error('Error inserting recipe ingredient:', error);
    return null;
  }
};

/**
 * Insert a recipe step
 * @param recipeId - Recipe UUID
 * @param stepIndex - Step number/order
 * @param description - Step description text
 * @param duration - Duration in minutes
 * @param tips - Additional tips as JSON
 * @returns Inserted row or null on error
 */
export const insertRecipeStep = async (
  recipeId: string,
  stepIndex: number,
  description: string,
  duration: number | null,
  tips: any = null
) => {
  try {
    const res = await pool.query(
      `INSERT INTO recipe_steps (recipeid, stepindex, description, duration, tips) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [recipeId, stepIndex, description, duration, tips]
    );
    return res.rows[0];
  } catch (error) {
    console.error('Error inserting recipe step:', error);
    return null;
  }
};
