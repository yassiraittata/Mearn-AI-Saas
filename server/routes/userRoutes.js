import {
  getPublishedCeations,
  getUserCeations,
  toggleLikeCreations,
} from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";

export default (router) => {
  router.get("/get-user-creations", auth, getUserCeations);
  router.get("/get-published-creations", auth, getPublishedCeations);
  router.post("/toggle-like-creations", auth, toggleLikeCreations);
};