import type { Request, Response } from "express";
import userModel from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema, signupSchema } from "../validation/auth.valid";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { config } from "../config/env";

export const handleSignup = async (req: Request, res: Response) => {
  try {
    const parsed = signupSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(new ApiError("Invalid request schema"));
    }

    const { name, email, password, role } = parsed.data;

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json(new ApiError("Email already exists"));
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPass,
      role,
    });

    return res.status(201).json(
      new ApiResponse({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }),
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(new ApiError("Invalid request schema"));
    }

    const { email, password } = parsed.data;

    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      return res.status(400).json(new ApiError("Invalid email or password"));
    }

    const checkPass = await bcrypt.compare(password, userExist.password);
    if (!checkPass) {
      return res.status(400).json(new ApiError("Invalid email or password"));
    }

    const token = jwt.sign(
      {
        id: userExist._id,
        role: userExist.role,
      },
      config.jwt_secret,
    );

    return res.status(200).json(new ApiResponse({ token }));
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const user = await userModel.findById( userId );

    if (!user) {
      return res.status(404).json(new ApiError("User not found"));
    }

    return res.status(200).json(
      new ApiResponse({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }),
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
