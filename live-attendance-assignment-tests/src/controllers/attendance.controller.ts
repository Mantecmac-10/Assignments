import type { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { attendanceSchema } from "../validation/attendance.valid";
import { ApiError } from "../utils/ApiError";
import classModel from "../models/class.model";
import { activeSession } from "../store/activeSession";

export const attendanceStart = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json(new ApiError("Unauthorized"));
    }

    const parsed = attendanceSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(new ApiError("Invalid request schema"));
    }

    const { classId } = parsed.data;

    const classExist = await classModel.findById(classId);
    if (!classExist) {
      return res.status(404).json(new ApiError("Class not found"));
    }

    if (classExist.teacherId?.toString() !== req.user.id) {
      return res.status(403).json(new ApiError("Forbidden, not class teacher"));
    }

    activeSession.classId = classId;
    activeSession.startedAt = new Date().toISOString();
    activeSession.attendance = {};

    const result = {
      classId: activeSession.classId,
      startedAt: activeSession.startedAt,
    };

    return res.status(200).json(new ApiResponse(result));
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
