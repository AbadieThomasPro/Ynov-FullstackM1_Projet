import express from "express";
import userRouter from "./routes/user.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();
const port = process.env.PORT || 3001;

// expose router user sur /user
app.use('/user', userRouter);
app.get("/", (req, res) => res.send("Hello from API USER!"));

// Configuration Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API User",
      version: "1.0.0",
      description: "Documentation de l'API user"
    },
  },
  apis: ["./src/routes/*.ts", "./src/routes/*.js"], // adapte le chemin si besoin
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Route Swagger
app.use("/user/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// disable etag on api-user as well to avoid 304 responses from this service
app.disable('etag');

app.listen(port, () => console.log(`Server running on port ${port}`));