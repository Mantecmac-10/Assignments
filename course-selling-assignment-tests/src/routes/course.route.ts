import { Router } from "express";
import { requireRole, verifyUser } from "../middleware/auth.middleware";
import {
  createCourse,
  deleteCourse,
  editCourse,
  getCourse,
  publicCourse,
} from "../controllers/course.controller";
import { validateBody } from "../middleware/validate";
import { courseSchema } from "../validation/course";
import { getLesson } from "../controllers/lesson.controller";

const router = Router();

router.post(
  "/",
  verifyUser,
  requireRole("INSTRUCTOR"),
  validateBody(courseSchema),
  createCourse,
);
router.get("/", publicCourse);
router.get("/:id", getCourse);
router.patch("/:id", verifyUser, requireRole("INSTRUCTOR"), editCourse);
router.delete("/:id", verifyUser, requireRole("INSTRUCTOR"), deleteCourse);
router.get("/:courseId/lessons", getLesson);

export default router;
