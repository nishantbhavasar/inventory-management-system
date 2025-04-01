import express from "express";
import authRouter from "./auth.route";
const rootRouter = express.Router();

// Auth Routes
rootRouter.use("/auth", authRouter);

export default rootRouter;
