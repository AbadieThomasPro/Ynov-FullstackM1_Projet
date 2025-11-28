import express from "express";
import userRouter from "./routes/user.js";

const app = express();
const port = process.env.PORT || 3001;

// expose router user sur /user
app.use('/user', userRouter);
app.get("/", (req, res) => res.send("Hello from API USER!"));

// disable etag on api-user as well to avoid 304 responses from this service
app.disable('etag');

app.listen(port, () => console.log(`Server running on port ${port}`));