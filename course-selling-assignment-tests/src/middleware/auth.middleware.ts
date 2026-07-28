import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { Role} from "../generated/prisma/client";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      role: Role;
    }
  }
}

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Authorization Token Missing.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Invalid Token", error);
    return res.status(401).send("Invalid Token");
  }
};
