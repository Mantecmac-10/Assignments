import { Router } from "express";
import { requireRole, verifyUser } from "../middleware/auth.middleware";
import { createCourse, publicCourse } from "../controllers/course.controller";

const router = Router();

router.post("/", verifyUser, requireRole("INSTRUCTOR"), createCourse);
router.get("/", verifyUser, publicCourse);

export default router;
