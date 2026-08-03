import type { Request, Response } from "express";
import { prisma } from "../../db";

export const postLesson = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, content, courseId } = req.body;

    const lesson = await prisma.lesson.create({
      data: {
        title,
        content,
        courseId,
      },
    });

    return res.status(200).json({ id: lesson.id });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getLesson = async (req: Request, res: Response) => {
  const courseId = req.params.courseId as string;

  const lessons = await prisma.lesson.findMany({
    where: {
      courseId: courseId,
    },
  });
  if (!lessons) {
    return res.status(400).json({ message: "Course Not Found" });
  }

  return res.status(200).json(lessons);
};
