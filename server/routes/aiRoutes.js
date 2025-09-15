import { requireAuth } from "@clerk/express";
import { generateArticle } from "../controllers/aiController.js";
import { auth } from "../middlewares/auth.js";

export default (router) => {
//   router.use(requireAuth());
  router.post("/generate-article", (req, res) =>
    res.json({ message: " hello" })
  );
};
