import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../db";

export const handleSignup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExist) {
      return res.status(400).json("This User already Exist!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const User = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
      select: {
        name: true,
        email: true,
        role: true,
      },
    });

    return res.status(200).json({ message: "User Created!", User });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const handleSignin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userExist) {
      return res.status(400).json("This User Doesn't Exist!");
    }

    const checkPass = await bcrypt.compare(password, userExist.password);

    if (!checkPass) {
      return res.status(400).json("Invalid Credentials!");
    }

    const token = jwt.sign(
      {
        id: userExist.id,
        role:userExist.role
      },
      process.env.JWT_SECRET!,
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
