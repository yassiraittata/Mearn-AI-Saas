import { clerkClient, getAuth } from "@clerk/express";
import createError from "http-errors";
import { FREE_PLAN, PREMIUM_PLAN } from "../utils/constants.js";

// middleware to check userId and plans
export const auth = async (req, res, next) => {
  try {
    const { userId, has } = getAuth(req);
    const hasPremiumPlan = await has({
      plan: PREMIUM_PLAN,
    });

    const user = await clerkClient.users.getUser(userId);

    if (!hasPremiumPlan && user.privateMetadata.free_usage) {
      req.free_usage = user.privateMetadata.free_usage;
    } else {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: 0,
        },
      });
      req.free_usage = 0;
    }

    req.plan = hasPremiumPlan ? PREMIUM_PLAN : FREE_PLAN;
    next();
  } catch (e) {
    next(createError(400, error.message));
  }
};
