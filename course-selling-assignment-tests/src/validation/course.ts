import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(1, "Enter Title!"),
  description: z.string().optional(),
  price: z.number(),
});

export const lessonSchema = z.object({
  title: z.string().min(1, "Enter Title!"),
  content: z.string().min(1, "Enter Content!"),
  courseId: z.string(),
});

export const purchaseSchema = z.object({
  courseId: z.string(),
});
