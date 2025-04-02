import express from "express";
import authRouter from "./auth.route";
import inventoryRouter from "./inventory.route";
const rootRouter = express.Router();

// Auth Routes
rootRouter.use("/auth", authRouter);

// Inventory Routes
rootRouter.use('/inventories',inventoryRouter);

export default rootRouter;
