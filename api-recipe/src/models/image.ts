import pool from '../config/db.js';

/**
 * Insert an image
 * @param stepId - Step UUID
 * @param image - Image data as JSONB
 * @param order - Display order
 * @param altText - Alternative text for accessibility
 * @returns Inserted row or null on error
 */
export const insertImage = async (
  stepId: string,
  image: any,
  order: number,
  altText: string
) => {
  try {
    const res = await pool.query(
      `INSERT INTO images (stepid, image, "order", alt_text) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [stepId, JSON.stringify(image), order, altText]
    );
    return res.rows[0];
  } catch (error) {
    console.error('Error inserting image:', error);
    return null;
  }
};
