import "module-alias/register";
import dotenv from "dotenv";
dotenv.config({ path: ".env" }); // configuration environment variable

import express, { Application } from "express";
import helmet from "helmet";
import { errroHandler, handle404 } from "./middleware/errorhandler";
import rootRouter from "./routes";
import morgan from "morgan";
import cors from "cors";
import "@/db/connection";

export const app: Application = express();

//Middleware
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

//Routes
app.use("/api", rootRouter);

//Error Handler
app.use(errroHandler as unknown as any); // Globle Error Handler
app.use("/", handle404 as unknown as any); // 404 route Handler

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running On Port http://localhost:${PORT}`);
});
