import type { Request, Response } from "express";
import { prisma } from "../../db";

export const createCourse = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { title, description, price } = req.body;

    const course = await prisma.course.create({
      data: {
        title,
        description,
        price,
        instructorId: req.user?.id,
      },
      select: {
        title,
        description,
        price,
      },
    });

    return res.status(200).send({ message: "Course Created!", course });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const publicCourse = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const courses = await prisma.course.findMany({
      select: {
        title: true,
        description: true,
        price: true,
        instructor: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(500).json({ courses });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const listLesson = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const courseId = req.params;

    const course = 
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
