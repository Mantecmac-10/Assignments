import { z } from "zod";

export const classSchema = z.object({
  className: z.string(),
});

export const addstudentSchema = z.object({
  studentId: z.string(),
});
