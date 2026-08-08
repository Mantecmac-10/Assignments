import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { ApiError } from "../utils/ApiError";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        role: "teacher" | "student";
      };
    }
  }
}

interface JwtPayload {
  id: string;
  role: "teacher" | "student";
}

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json(new ApiError("Unauthorized, token missing or invalid"));
  }

  try {
    const decoded = jwt.verify(token, config.jwt_secret) as JwtPayload;

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };
    next();
  } catch (error) {
    res
      .status(401)
      .json(new ApiError("Unauthorized, token missing or invalid"));
    return;
  }
};

export const onlyTeacher = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user.role !== "teacher") {
    return res
      .status(403)
      .json(new ApiError("Forbidden, teacher access required"));
  }

  next();
};
