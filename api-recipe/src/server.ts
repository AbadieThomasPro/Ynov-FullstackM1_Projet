import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";


const app = express();
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
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => res.send("Hello from API RECIPE!"));
app.listen(port, () => console.log(`Server running on port ${port}`));