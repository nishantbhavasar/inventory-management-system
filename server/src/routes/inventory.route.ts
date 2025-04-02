import express, { NextFunction, Request, Response } from "express";
import { ROUTES } from "../constant/routes.constant";
import sendResponse from "@/helper/responseGenerator";
import { validatePayload } from "@/middleware/validatePayload";
import InventoryController from "@/controller/inventory.controller";
import { createInventoryValidate, updateInventoryValidate } from "@/validation/inventory.validation";

const inventoryRouter = express.Router();

const inventoryController = new InventoryController();

// get all inventory Api
inventoryRouter.post(
  ROUTES.GET_ALL_INVENTORIES,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await inventoryController.getAllInventory();
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

// get inventory by id Api
inventoryRouter.get(
  ROUTES.GET_INVENTORY,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await inventoryController.getInventory(
        Number(req?.params?.id)
      );
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

// create inventory by id Api
inventoryRouter.post(
  ROUTES.CREATE_INVENTORY,
  validatePayload(createInventoryValidate),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await inventoryController.createInventory(req?.body);
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

// update inventory by id Api
inventoryRouter.put(
  ROUTES.UPDATE_INVENTORY,
  validatePayload(updateInventoryValidate),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await inventoryController.updateInventory(
        Number(req?.params?.id),
        req?.body
      );
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

// delete inventory by id Api
inventoryRouter.delete(
  ROUTES.DELETE_INVENTORY,
  //   validatePayload(loginSchemaValidate),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await inventoryController.deleteInventory(
        Number(req?.params?.id)
      );
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

export default inventoryRouter;
