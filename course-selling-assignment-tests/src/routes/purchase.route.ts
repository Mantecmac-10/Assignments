import { Router } from "express";
import { requireRole, verifyUser } from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validate";
import { purchaseSchema } from "../validation/course";
import { listPurchase, purchases } from "../controllers/purchase.controller";

const router = Router();

router.post(
  "/purchases",
  verifyUser,
  requireRole("STUDENT"),
  validateBody(purchaseSchema),
  purchases,
);

router.get(
  "/users/:id/purchases",
  verifyUser,
  requireRole("STUDENT"),
  listPurchase,
);

export default router;
