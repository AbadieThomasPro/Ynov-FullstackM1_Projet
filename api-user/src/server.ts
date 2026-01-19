import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import 'dotenv/config';
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";

const app = express();
app.use(express.json());
const port = process.env.PORT || 3001;


// Configuration Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API User",
      version: "1.0.0",
      description: "Documentation de l'API user"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      { bearerAuth: [] }
    ]
  },
  apis: ["./src/routes/*.ts", "./src/routes/*.js"],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Route Swagger
app.use("/user/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use((req, res, next) => {
  console.log(`[API-USER] ${req.method} ${req.originalUrl}`);
  next();
});

// expose router user sur /user et auth sur /user/auth
app.use('/user', userRouter);
app.use("/user/auth", authRouter);
app.get("/", (req, res) => res.send("Hello from API USER!"));




// disable etag on api-user as well to avoid 304 responses from this service
app.disable('etag');

app.listen(port, () => console.log(`Server running on port ${port}`));