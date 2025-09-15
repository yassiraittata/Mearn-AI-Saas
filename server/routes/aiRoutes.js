import {
  generateArticle,
  generateBlogTitle,
  generateImage,
} from "../controllers/aiController.js";
import { auth } from "../middlewares/auth.js";

export default (router) => {
  router.post("/generate-article", auth, generateArticle);
  router.post("/generate-blog-title", auth, generateBlogTitle);
  router.post("/generate-image", auth, generateImage);
};
