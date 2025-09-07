import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Express server is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
