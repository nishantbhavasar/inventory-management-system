import express, { NextFunction, Request, Response } from "express";
import { ROUTES } from "../constant/routes.constant";
import sendResponse from "@/helper/responseGenerator";
import { validatePayload } from "@/middleware/validatePayload";
import InventoryController from "@/controller/inventory.controller";
import { createInventoryValidate, updateInventoryValidate } from "@/validation/inventory.validation";
import { checkPermission } from "@/middleware/checkPermission";
import { jwtValidation } from "@/middleware/validateToken";
import { PERMISSIONS } from "@/constant/constant";
import { upload } from "@/middleware/multerMiddleware";

const inventoryRouter = express.Router();

const inventoryController = new InventoryController();

// get all inventory Api
inventoryRouter.post(
  ROUTES.GET_ALL_INVENTORIES,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await inventoryController.getAllInventory(req?.body ?? {});
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
  upload.single('image'),
  jwtValidation,
  checkPermission(PERMISSIONS.INVENTORY.CREATE),
  // Middleware to convert form-data string values to appropriate types and attach image
  (req: Request, res: Response, next: NextFunction) => {
    // Convert price and quantity to numbers
    if (req.body.price) {
      req.body.price = parseFloat(req.body.price);
    }
    if (req.body.quantity) {
      req.body.quantity = parseInt(req.body.quantity, 10);
    }

    // Convert categories string "[1]" to an array.
    // If categories is sent as a JSON string, parse it.
    if (req.body.categories && typeof req.body.categories === "string") {
      try {
        req.body.categories = JSON.parse(req.body.categories);
      } catch (error) {
        req.body.categories = req.body.categories.split(',').map((cat: string) => cat.trim());
      }
    }

    // If an image file was uploaded, attach it as an array in req.body.images.
    if (req.file) {
      req.body.images = [req.file];
    }

    next();
  },
  validatePayload(createInventoryValidate),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await inventoryController.createInventory(req?.body, req.user.id);
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
  jwtValidation,
  checkPermission(PERMISSIONS.INVENTORY.UPDATE),
  // Middleware to convert form-data string values to appropriate types and attach image
  (req: Request, res: Response, next: NextFunction) => {
    // Convert price and quantity to numbers
    if (req.body.price) {
      req.body.price = parseFloat(req.body.price);
    }
    if (req.body.quantity) {
      req.body.quantity = parseInt(req.body.quantity, 10);
    }

    // Convert categories string "[1]" to an array.
    // If categories is sent as a JSON string, parse it.
    if (req.body.categories && typeof req.body.categories === "string") {
      req.body.categories = req.body.categories.split(',').map((cat: string) => cat.trim());
    }

    // If an image file was uploaded, attach it as an array in req.body.images.
    if (req.file) {
      req.body.images = [req.file];
    }
    next();
  },
  validatePayload(updateInventoryValidate),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("=====================>",{id:req?.params?.id})
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
