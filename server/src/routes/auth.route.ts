import express, { NextFunction, Request, Response } from "express";
import { AuthController } from "../controller/auth.controller";
import { ROUTES } from "../constant/routes.constant";
import sendResponse from "@/helper/responseGenerator";
import { validatePayload } from "@/middleware/validatePayload";
import { loginSchemaValidate, registarSchemaValidate } from "@/validation/auth.validation";

const authRouter = express.Router();

const authController = new AuthController();

// Register Api
authRouter.post(
  ROUTES.REGISTER_USER,
  validatePayload(registarSchemaValidate),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const response = await authController.register(req.body);
      sendResponse({
        res,
        ...response
      });
      return;
    } catch (error) {
      next(error);
    }
  }
);

// Login Api
authRouter.post(
  ROUTES.LOGIN_USER,
  validatePayload(loginSchemaValidate),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const response = await authController.login(req.body);
      sendResponse({
        res,
        ...response
      })
      return;
    } catch (error) {
      next(error);
    }
  }
);

export default authRouter;
