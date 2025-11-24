import express from "express";

const app = express();
const port = process.env.PORT || 3333;

app.get("/", (req, res) => res.send("Hello from API PRIVATE!"));
app.listen(port, () => console.log(`Server running on port ${port}`));