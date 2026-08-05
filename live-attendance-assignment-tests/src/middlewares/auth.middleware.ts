import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";

declare global {
  namespace Express {
    interface Request {
      user?: {
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
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Authorization Token Missing.");
  }

  try {
    const decoded = jwt.verify(token, config.jwt_secret) as JwtPayload;

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };
    next();
  } catch (error) {
    console.error("Invalid Token", error);
    return res.status(401).send("Invalid Token");
  }
};

export const requireRole = (role: "teacher" | "student") => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.id) {
      return res.status(401).send("Unauthorized User!");
    }
    if (!role.includes(req.user.role)) {
      return res.status(403).send("Forbidden!");
    }
    next();
  };
};
