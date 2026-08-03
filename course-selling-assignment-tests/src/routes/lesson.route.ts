import { Router } from "express";
import { requireRole, verifyUser } from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validate";
import { lessonSchema } from "../validation/course";
import { postLesson } from "../controllers/lesson.controller";

const router = Router();

router.post(
  "/",
  verifyUser,
  requireRole("INSTRUCTOR"),
  validateBody(lessonSchema),
  postLesson,
);

export default router;

