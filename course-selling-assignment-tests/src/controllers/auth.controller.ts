import type { Request, Response } from "express";

export const handleSignup = async (req: Request, res: Response) => {
  try {
    
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
