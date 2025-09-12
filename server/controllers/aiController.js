import { getAuth } from "@clerk/express";
import createError from "http-errors";
import { PREMIUM_PLAN } from "../utils/constants.js";

export const generateArticle = async (req, res) => {
  const { userId } = getAuth(req);
  const { prompt, length } = req.body;
  const plan = req.plan;
  const free_usage = req.free_usage;

  if (plan != PREMIUM_PLAN && free_usage >= 10) {
    return next(createError(400, "Limit reached. Upgrade to continue"));
  }
};
