import type { Request, Response } from "express";
import { helloService } from "../services/recipe.js";

export const helloController = (req: Request, res: Response) => {
  const message = helloService();
  res.status(200).json({ message });
};