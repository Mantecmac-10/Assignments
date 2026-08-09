import { Router } from "express";
import { onlyTeacher, verifyUser } from "../middlewares/auth.middleware";
import {
  addStudent,
  classInfo,
  createClass,
  myAttendance,
} from "../controllers/class.controller";

const router = Router();

router.post("/", verifyUser, onlyTeacher, createClass);
router.post("/:id/add-student", verifyUser, onlyTeacher, addStudent);
router.get("/:id", verifyUser, classInfo);
router.get("/:id/my-attendance", verifyUser, myAttendance);

export default router;
