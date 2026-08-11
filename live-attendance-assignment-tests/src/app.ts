import express from "express";
import { app, server } from "./server";

app.use(express.json());

import authRouter from "./routes/auth.route";
import classRouter from "./routes/class.route";
import studentRouter from "./routes/student.route";
import attendanceRouter from "./routes/attendance.route";
import { connectdb } from "./config/db";
import "./wss/ws";

app.use("/auth", authRouter);
app.use("/class", classRouter);
app.use("/students", studentRouter);
app.use("/attendance", attendanceRouter);

connectdb()
  .then(() => {
    server.listen(3000, () => {
      console.log("Server started at http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("Server Error", err);
    process.exit(1);
  });
