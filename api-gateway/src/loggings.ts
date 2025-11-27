import morgan from "morgan";
import type { Express } from "express";

export const setupLogging = (app: Express) => {
  app.use(morgan("combined"));
};