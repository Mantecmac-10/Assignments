import { Router } from "express";
import {
  getMe,
  handleLogin,
  handleSignup,
} from "../controllers/auth.controller";
import { verifyUser } from "../middlewares/auth.middleware";

const router = Router();

router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.get("/me", verifyUser, getMe);

export default router;
