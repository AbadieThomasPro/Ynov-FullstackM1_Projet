import { insertImage } from '../models/image.js';

/**
 * Insert multiple images for recipe steps
 * @param recipeId - Recipe UUID (for reference, not used in DB insertion)
 * @param images - Array of image data
 * @returns Array of results with alt_text and insert status
 */
export const addStepImages = async (recipeId: string, images: any[]) => {
  const results = [];
  
  for (const img of images) {
    const { stepId, image, order, alt_text } = img;
    
    const inserted = await insertImage(
      stepId,
      image,
      order,
      alt_text
    );
    
    results.push({
      alt_text,
      inserted: inserted !== null
    });
  }
  
  return results;
};
