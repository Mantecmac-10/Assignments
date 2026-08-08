import { Router } from "express";
import { onlyTeacher, verifyUser } from "../middlewares/auth.middleware";
import {
  addStudent,
  classInfo,
  createClass,
} from "../controllers/class.controller";

const router = Router();

router.post("/", verifyUser, onlyTeacher, createClass);
router.post("/:id/add-student", verifyUser, onlyTeacher, addStudent);
router.get("/:id", verifyUser, classInfo);

export default router;
