import express from "express";

const app = express();

app.use(express.json());

import authRouter from "./routes/auth.route";
import courseRouter from "./routes/course.route";
import lessonRouter from "./routes/lesson.route";
import purchaseRouter from "./routes/purchase.route";
import { verifyUser } from "./middleware/auth.middleware";
import { prisma } from "../db";

app.use("/auth", authRouter);
app.use("/courses", courseRouter);
app.use("/lessons", lessonRouter);
app.use("/", purchaseRouter);

app.get("/me", verifyUser, async (req, res) => {
  const user = await prisma.user.findFirst({
    where: {
      id: req.user!.id,
      role: req.user!.role,
    },
  });

  return res.json({
    id: req.user!.id,
    role: req.user!.role,
    email: user?.email,
    name: user?.name,
  });
});

app.listen(3000, () => {
  console.log("Server Started!");
});
