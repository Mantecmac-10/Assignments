import express from "express";

export const app = express();

app.use(express.json());

import authRouter from "./routes/auth.route";
import classRouter from "./routes/class.route";
import studentRouter from "./routes/student.route";
import attendanceRouter from "./routes/attendance.route";

app.use("/auth", authRouter);
app.use("/class", classRouter);
app.use("/students", studentRouter);
app.use("/attendance", attendanceRouter);
