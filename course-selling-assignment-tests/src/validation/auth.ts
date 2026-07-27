import { z } from "zod";
import { Role } from "../generated/prisma/enums";

export const signupSchema = z.object({
  email: z.email("Enter a valid email address!"),
  password: z.string().min(6, "Password should be more than 6 characters."),
  name: z.string(),
  role: z.enum(Role).default("Student"),
});

export const loginSchema = signupSchema.pick({
  email: true,
  password: true,
});
