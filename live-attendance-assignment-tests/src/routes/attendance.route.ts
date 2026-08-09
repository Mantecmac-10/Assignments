import { Router } from "express";
import { onlyTeacher, verifyUser } from "../middlewares/auth.middleware";
import { attendanceStart } from "../controllers/attendance.controller";

const router = Router();

router.post("/start", verifyUser, onlyTeacher, attendanceStart);

export default router;
