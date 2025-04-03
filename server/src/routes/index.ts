import express from "express";
import authRouter from "./auth.route";
import inventoryRouter from "./inventory.route";
import categoryRouter from "./category.route";
const rootRouter = express.Router();

// Auth Routes
rootRouter.use("/auth", authRouter);

// Inventory Routes
rootRouter.use('/inventories',inventoryRouter);

// Category Routes
rootRouter.use('/categories', categoryRouter);

export default rootRouter;
