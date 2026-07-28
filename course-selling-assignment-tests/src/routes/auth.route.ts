import { Router } from "express";
import { handleSignin, handleSignup } from "../controllers/auth.controller";
import { validateBody } from "../middleware/validate";
import { loginSchema, signupSchema } from "../validation/auth";

const router = Router();

router.post("/signup", validateBody(signupSchema), handleSignup);
router.post("/login", validateBody(loginSchema), handleSignin);

export default router;
