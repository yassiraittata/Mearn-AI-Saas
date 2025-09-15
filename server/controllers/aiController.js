import { clerkClient, getAuth } from "@clerk/express";
import createError from "http-errors";
import { PREMIUM_PLAN } from "../utils/constants.js";
import OpenAI from "openai";
import { v2 as cloudinary } from "cloudinary";

import sql from "../configs/db.js";
import axios from "axios";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const generateArticle = async (req, res) => {
  const { userId } = getAuth(req);
  const { prompt, length } = req.body;
  const plan = req.plan;
  const free_usage = req.free_usage;

  console.log("prompt", prompt);

  if (plan != PREMIUM_PLAN && free_usage >= 10) {
    return next(createError(400, "Limit reached. Upgrade to continue"));
  }

  const response = await AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_completion_tokens: length,
  });

  const content = response.choices[0].message.content;

  await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES(${userId}, ${prompt}, ${content}, 'article')`;

  if (plan != PREMIUM_PLAN) {
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        free_usage: free_usage + 1,
      },
    });
  }

  res.json({ success: true });
};

export const generateBlogTitle = async (req, res) => {
  const { userId } = getAuth(req);
  const { prompt } = req.body;
  const plan = req.plan;
  const free_usage = req.free_usage;

  if (plan != PREMIUM_PLAN && free_usage >= 10) {
    return next(createError(400, "Limit reached. Upgrade to continue"));
  }

  const response = await AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_completion_tokens: 100,
  });

  const content = response.choices[0].message.content;

  await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES(${userId}, ${prompt}, ${content}, 'blog-title')`;

  if (plan != PREMIUM_PLAN) {
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        free_usage: free_usage + 1,
      },
    });
  }

  res.json({ success: true });
};

export const generateImage = async (req, res) => {
  const { userId } = getAuth(req);
  const { prompt, pubish } = req.body;
  const plan = req.plan;

  if (plan != PREMIUM_PLAN) {
    return next(
      createError(
        400,
        "This feature is only for available for premium subsciptions"
      )
    );
  }

  const formData = new FormData();
  form.append("prompt", prompt);

  const { data } = await axios.post(
    "https://clipdrop-api.co/text-to-image/v1",
    formData,
    {
      headers: {
        "x-api-key": process.env.CLIPDROP_API_KEY,
      },
      responseType: "arraybuffer",
    }
  );

  const base64Image = `data:image/png;base64,${Buffer.from(
    data,
    "binary"
  ).toString("base64")}`;

  const { secure_url } = await cloudinary.uploader.upload(base64Image);

  await sql`INSERT INTO creations (user_id, prompt, content, type, publish) VALUES(${userId}, ${prompt}, ${secure_url}, 'image', ${
    pubish ?? flase
  })`;

  res.json({ success: true, content: secure_url });
};
