import express, { NextFunction, Request, Response } from "express";
import { CategoryController } from "../controller/category.controller";
import { ROUTES } from "../constant/routes.constant";
import sendResponse from "@/helper/responseGenerator";
import { validatePayload } from "@/middleware/validatePayload";
import { createCategorySchemaValidate } from "@/validation/category.validation";

const categoryRouter = express.Router();

const categoryController = new CategoryController();

// Create Category
categoryRouter.post(
  ROUTES.CREATE_CATEGORY,
  validatePayload(createCategorySchemaValidate),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await categoryController.createCategory(req?.body);
      sendResponse({
        res,
        ...response,
      });
      return;
    } catch (error) {
      next(error);
    }
  }
);

// Get All Category
categoryRouter.get(
  ROUTES.GET_ALL_CATEGORIES,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await categoryController.getAllcategories();
      sendResponse({
        res,
        ...response,
      });
      return;
    } catch (error) {
      next(error);
    }
  }
);

// Delete Category
categoryRouter.delete(
  ROUTES.DELETE_CATEGORY,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const response = await categoryController.deleteCategory(
        Number(req?.params?.id)
      );
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

export default categoryRouter;
