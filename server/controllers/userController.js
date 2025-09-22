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
  const { userId } = getAuth(req);

  const creations =
    await sql`SELECT * FROM creations WHERE pubish = true ORDER BY created_at DESC`;

  res.json({ success: true, creations });
};
