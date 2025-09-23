import { clerkClient, getAuth } from "@clerk/express";
import createError from "http-errors";
import { PREMIUM_PLAN } from "../utils/constants.js";
import OpenAI from "openai";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

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

  res.json({ success: true, content });
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

export const removeImageBackground = async (req, res) => {
  const { userId } = getAuth(req);
  const { image } = req.file;
  const plan = req.plan;

  if (plan != PREMIUM_PLAN) {
    return next(
      createError(
        400,
        "This feature is only for available for premium subsciptions"
      )
    );
  }

  const { secure_url } = await cloudinary.uploader.upload(image.path, {
    transformation: [
      {
        effect: "background_removal",
        background_removal: "remove_the_background",
      },
    ],
  });

  await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES(${userId}, 'Remove background from image', ${secure_url}, 'image')`;

  res.json({ success: true, content: secure_url });
};

export const removeImageObject = async (req, res) => {
  const { userId } = getAuth(req);
  const { object } = req.body;
  const { image } = req.file;
  const plan = req.plan;

  if (plan != PREMIUM_PLAN) {
    return next(
      createError(
        400,
        "This feature is only for available for premium subsciptions"
      )
    );
  }

  const { public_id } = await cloudinary.uploader.upload(image.path);
  const imageUrl = cloudinary.url(public_id, {
    transformation: [
      {
        effect: `gen_remove: ${object}`,
      },
    ],
    resource_type: "image",
  });

  await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES(${userId}, ${`Remove ${object} from image`}, ${imageUrl}, 'image')`;

  res.json({ success: true, content: imageUrl });
};

export const resumeReview = async (req, res) => {
  const { userId } = getAuth(req);
  const resume = req.file;
  const plan = req.plan;

  if (plan != PREMIUM_PLAN) {
    return next(
      createError(
        400,
        "This feature is only for available for premium subsciptions"
      )
    );
  }

  if (resume.size > 5 * 1024 * 1024) {
    createError(400, "Resume file exceeds allow size (5MB)");
  }

  const dataBuffer = fs.readFileSync(resume.path);
  const pdfData = await pdf(dataBuffer);

  const prompt = `Review the following resume and provide constructive feedback on its strengths, weekness, and areas for improvement. Resume Content: \n\n${pdfData.text}`;

  const response = await AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_completion_tokens: 1000,
  });

  const content = response.choices[0].message.content;

  await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES(${userId}, ${prompt}, ${content}, 'resume-review')`;

  res.json({ success: true, content });
};
