import express from "express";

import aiRoutes from "./aiRoutes.js";

const router = express.Router();

export default () => {
  aiRoutes(router);

  return router;
};
