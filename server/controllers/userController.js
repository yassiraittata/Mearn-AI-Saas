import createError from "http-errors";
import { clerkClient, getAuth } from "@clerk/express";
import sql from "../configs/db.js";

export const getUserCeations = async (req, res) => {
  const { userId } = getAuth(req);

  const creations =
    await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;

  res.json({ success: true, creations });
};

export const getPublishedCeations = async (req, res) => {
  const creations =
    await sql`SELECT * FROM creations WHERE pubish = true ORDER BY created_at DESC`;

  res.json({ success: true, creations });
};

export const toggleLikeCreations = async (req, res) => {
  const { userId } = getAuth(req);
  const { id } = req.body;

  const [creations] = await sql`SELECT * FROM creations WHERE id = ${id}`;

  if (!creations) {
    throw createError(404, "Creation not found");
  }

  let currentLikes = creations.likes || [];
  const userIdStr = userId.toString();
  let updatedLikes;
  let message;

  if (currentLikes.includes(userIdStr)) {
    updatedLikes = currentLikes.filter((user) => user !== userIdStr);
    message = "Creation unliked";
  } else {
    updatedLikes = [...currentLikes, userIdStr];
    message = "Creation liked";
  }

  const formattedArray = `{${updatedLikes.join(",")}}`;

  await sql`UPDATE creations SET likes = ${formattedArray}::text[] WHERE id = ${id}`;

  res.json({ success: true, message });
};
