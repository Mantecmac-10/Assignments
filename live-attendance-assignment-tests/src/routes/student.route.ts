import { Router} from "express";
import { onlyTeacher, verifyUser } from "../middlewares/auth.middleware";
import userModel from "../models/user.model";
import { ApiResponse } from "../utils/ApiResponse";

const router = Router();

router.get("/", verifyUser, onlyTeacher, async (req, res) => {
  const students = await userModel
    .find({
      role: "student",
    })
    .select("_id name email");

  return res.status(200).json(new ApiResponse(students));
});

export default router;
