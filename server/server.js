import express from "express";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import cors from "cors";
import "dotenv/config";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173/",
  })
);
app.use(express.json());
app.use(clerkMiddleware());

app.use(requireAuth());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
