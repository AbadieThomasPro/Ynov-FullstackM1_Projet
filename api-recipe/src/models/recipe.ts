import pool from '../config/db.js';

export const findAllRecipes = async () => {
  const res = await pool.query('SELECT * FROM recipes ORDER BY createdat DESC');
  return res.rows;
};

export const findRecipeById = async (id: string) => {
  const res = await pool.query('SELECT * FROM recipes WHERE recipeid = $1', [id]);
  return res.rows[0];
};

export const insertRecipe = async (data: any) => {
  const { name, userid, description, servings } = data;
  const res = await pool.query(
    `INSERT INTO recipes (name, userid, description, servings, createdat) VALUES ($1,$2,$3,$4,now()) RETURNING *`,
    [name, userid, description, servings]
  );
  return res.rows[0];
};

export const deleteRecipeById = async (id: string) => {
  const res = await pool.query('DELETE FROM recipes WHERE recipeid = $1 RETURNING *', [id]);
  return res.rows[0];
};

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
