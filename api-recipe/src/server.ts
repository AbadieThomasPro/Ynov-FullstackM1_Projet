import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import recipeRouter from "./routes/recipe.js";
import ingredientRouter from "./routes/ingredient.js";

const app = express();
app.use(express.json());
const port = process.env.PORT || 3002;

// Configuration Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Recipe",
      version: "1.0.0",
      description: "Documentation de l'API Recipe"
    },
  },
  apis: ["./src/routes/*.ts", "./src/routes/*.js"], // adapte le chemin si besoin
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Route Swagger
app.use("/recipe/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/recipe", recipeRouter);
app.use('/recipe/ingredients', ingredientRouter);

app.get("/", (req, res) => res.send("Hello from API RECIPE!"));

// Generic error handler to return JSON instead of HTML
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error', err);
  const status = err?.status || 500;
  res.status(status).json({ error: err?.message || 'Internal Server Error' });
});

app.listen(port, () => console.log(`Server running on port ${port}`));