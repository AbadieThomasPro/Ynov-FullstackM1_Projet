import express from "express";
import cors from "cors";
import { setupProxies } from "./proxy.js";
import { setupLogging} from "./loggings.js";
import { ROUTES } from "./routes.js";

const app = express();
const port = process.env.PORT || 3000;

// Augmentation de la limite pour les images en base64
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Autorisation des requêtes depuis le frontend Angular [CORS]
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));

// Logs centralisés pour toutes les requêtes
setupLogging(app);

// Route de test du gateway
app.get("/", (req, res) => res.send("Hello from API Gateway!"));

// Configuration des proxies vers les microservices
setupProxies(app, ROUTES);

// Gestion centralisée des erreurs
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err?.message || "Internal Server Error" });
});

app.listen(port, () => console.log(`Server running on port ${port}`));