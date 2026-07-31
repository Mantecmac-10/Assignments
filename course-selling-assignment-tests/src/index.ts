import express from "express";

const app = express();

app.use(express.json());

import authRouter from "./routes/auth.route";
import courseRouter from "./routes/course.route";

app.use("/auth", authRouter);
app.use("/courses", courseRouter);

app.listen(3000, () => {
  console.log("Server Started!");
});
