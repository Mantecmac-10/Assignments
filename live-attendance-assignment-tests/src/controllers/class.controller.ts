import type { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { addstudentSchema, classSchema } from "../validation/class.valid";
import classModel from "../models/class.model";
import { ApiResponse } from "../utils/ApiResponse";
import userModel from "../models/user.model";

export const createClass = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json(new ApiError("Unauthorized"));
    }

    const userId = req.user.id;

    const parsed = classSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(new ApiError("Invalid request schema"));
    }

    const { className } = parsed.data;

    const result = await classModel.create({
      className,
      teacherId: req.user.id,
      studentIds: [],
    });

    return res.status(201).json(
      new ApiResponse({
        _id: result._id,
        className: result.className,
        teacherId: result.teacherId,
        studentIds: result.studentIds,
      }),
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const addStudent = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json(new ApiError("Unauthorized"));
    }

    const classId = req.params.id;

    const parsed = addstudentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(new ApiError("Invalid request schema"));
    }

    const { studentId } = parsed.data;

    const classExist = await classModel.findById(classId);
    if (!classExist) {
      return res.status(404).json(new ApiError("Class not found"));
    }

    if (classExist.teacherId?.toString() !== req.user.id) {
      return res.status(403).json(new ApiError("Forbidden, not class teacher"));
    }

    const student = await userModel.findById(studentId);
    if (!student) {
      return res.status(404).json(new ApiError("Student not found"));
    }

    if (!classExist.studentIds.includes(student._id)) {
      classExist.studentIds.push(student._id);
      await classExist.save();
    }

    return res.status(200).json(
      new ApiResponse({
        _id: classExist._id,
        className: classExist.className,
        teacherId: classExist.teacherId,
        studentIds: classExist.studentIds,
      }),
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const classInfo = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json(new ApiError("Unauthorized"));
    }

    const id = req.params.id;

    const classExist = await classModel.findById(id).populate({
      path: "studentIds",
      select: "_id name email",
    });
    if (!classExist) {
      return res.status(404).json(new ApiError("Class not found"));
    }

    const isTeacher =
      req.user.role === "teacher" &&
      classExist.teacherId.toString() === req.user.id;

    const isStudent =
      req.user.role === "student" &&
      classExist.studentIds.some((s) => s._id.toString() === req.user.id);

    if (!isTeacher && !isStudent) {
      return res.status(403).json(new ApiError("Forbidden, not class teacher"));
    }

    const result = {
      _id: classExist._id,
      className: classExist.className,
      teacherId: classExist.teacherId,
      students: classExist.studentIds,
    };

    return res.status(200).json(new ApiResponse(result));
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
