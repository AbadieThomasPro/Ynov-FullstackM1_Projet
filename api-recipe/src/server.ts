import express from "express";

const app = express();
const port = process.env.PORT || 3002;


app.get("/", (req, res) => res.send("Hello from API RECIPE!"));
app.listen(port, () => console.log(`Server running on port ${port}`));