import type { Request, Response } from "express";
import { prisma } from "../../db";
import { createContext } from "react";

export const purchases = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const { courseId } = req.body;

    const courseExist = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!courseExist) {
      return res.status(400).json({ message: "Course Not Found" });
    }

    const makePurchase = await prisma.purchase.create({
      data: {
        userId: req.user.id,
        courseId,
        cost: courseExist.price,
      },
    });

    return res.status(200).json({ message: "Purchase Made", makePurchase });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const listPurchase = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    const id = req.params.id as string;

    if (req.user.id !== id) {
      return res.status(403).json("Forbidden");
    }

    const purchases = await prisma.purchase.findMany({
      where: {
        userId: id,
      },
      include: {
        course: true,
      },
    });

    return res.status(200).json(purchases);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
