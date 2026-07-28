import express from "express";

const app = express();

app.use(express.json());

import authRouter from "./routes/auth.route"

app.use("/auth" , authRouter)

app.listen(3000, () => {
  console.log("Server Started!");
});

