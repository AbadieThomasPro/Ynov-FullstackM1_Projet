import express from "express";
import { setupProxies } from "./proxy.js";

import { ROUTES } from "./routes.js";

const app = express();
const port = process.env.PORT || 3000;

// app.use(express.json)

app.get("/", (req, res) => res.send("Hello from API Gateway!"));

setupProxies(app, ROUTES);

app.listen(port, () => console.log(`Server running on port ${port}`));