import { Router } from "express";
import { requireRole, verifyUser } from "../middleware/auth.middleware";
import {
  createCourse,
  editCourse,
  listLesson,
  publicCourse,
} from "../controllers/course.controller";
import { validateBody } from "../middleware/validate";
import { courseSchema } from "../validation/course";

const router = Router();

router.post(
  "/",
  verifyUser,
  requireRole("INSTRUCTOR"),
  validateBody(courseSchema),
  createCourse,
);
router.get("/", publicCourse);
router.get("/:id", verifyUser, listLesson);
router.patch(
  "/:id",
  verifyUser,
  requireRole("INSTRUCTOR"),
  validateBody(courseSchema.optional()),
  editCourse,
);

export default router;
