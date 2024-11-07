import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, { message: 'Title is required', }).max(60, { message: 'Title must be at most 60 characters', }),
  content: z.string().min(1, { message: 'Content is required', }).max(280, { message: 'Content must be at most 280 characters', })
});