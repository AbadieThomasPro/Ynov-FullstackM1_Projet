import express from "express";
import { setupProxies } from "./proxy.js";
import { setupLogging} from "./loggings.js";
import { ROUTES } from "./routes.js";

const app = express();
const port = process.env.PORT || 3000;

// app.use(express.json)

// logging (centralisé)
setupLogging(app);


app.get("/", (req, res) => res.send("Hello from API Gateway!"));

setupProxies(app, ROUTES);

// basic error handler for readable errors during dev
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err?.message || "Internal Server Error" });
});

app.listen(port, () => console.log(`Server running on port ${port}`));