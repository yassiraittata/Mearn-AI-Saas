import express from "express";

import aiRoutes from "./aiRoutes.js";
import userRoutes from "./userRoutes.js";

const router = express.Router();

export default () => {
  aiRoutes(router);
  userRoutes(router);

  return router;
};
