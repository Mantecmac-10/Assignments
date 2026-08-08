import express from "express";

export const app = express();

app.use(express.json());

import authRouter from "./routes/auth.route";
import classRouter from "./routes/class.route";

app.use("/auth", authRouter);
app.use("/class", classRouter);
