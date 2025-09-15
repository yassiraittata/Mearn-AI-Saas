import express from "express";
import "dotenv/config";
import { clerkMiddleware, requireAuth,  } from "@clerk/express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import Router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173/",
  })
);
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("Welcome to my application!");
});

app.use(requireAuth());
app.use("/api/ai", Router());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
