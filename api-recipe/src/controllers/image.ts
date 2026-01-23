import type { Request, Response } from 'express';
import { addStepImages } from '../services/image.js';

/**
 * Add images to recipe steps
 * POST /recipe/:id/images
 * Body: { images: [{stepId, image, order, alt_text}] }
 */
export const addStepImagesController = async (req: Request, res: Response) => {
  const recipeId = req.params.id;
  const { images } = req.body;
  
  if (!recipeId) return res.status(400).json({ message: 'Missing recipeId' });
  if (!images || !Array.isArray(images) || images.length === 0) {
    return res.status(400).json({ message: 'Missing or invalid images array' });
  }
  
  try {
    const results = await addStepImages(recipeId, images);
    res.status(201).json(results);
  } catch (error) {
    console.error('Error adding step images:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
