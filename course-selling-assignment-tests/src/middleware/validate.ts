import type { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodType } from "zod";

export const validateBody = <T>(schema: ZodType<T>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    // Replace req.body with the validated data
    req.body = result.data;

    next();
  };
};
