import express from "express";

export const app = express();

app.use(express.json());

import authRouter from "./routes/auth.route";

app.use("/auth", authRouter);