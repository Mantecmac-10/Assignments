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
    });

    return res.status(200).json({ id: course.id });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const publicCourse = async (req: Request, res: Response) => {
  try {
    const data = await prisma.course.findMany();

    return res.json(data);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getCourse = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const course = await prisma.course.findUnique({
      where: {
        id: id,
      },
    });
    if (!course) {
      return res.status(404).json({
        message: "Course Not Found",
      });
    }

    return res.status(200).json(course);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const editCourse = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const id = req.params.id as string;

    const { title, description, price } = req.body;

    const newCourse = await prisma.course.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        price,
      },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
      },
    });

    if (!newCourse) {
      return res.status(400).json("Course Not Found!");
    }

    return res.status(200).json(newCourse);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const id = req.params.id as string;

    const course = await prisma.course.delete({
      where: { id },
    });

    if (!course) {
      return res.status(400).json("Course Not Found");
    }

    return res.status(200).json({ message: "Course deleted" });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
