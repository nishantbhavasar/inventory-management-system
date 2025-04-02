import { ResponseType } from "@/types/ResponseType";
import Inventories from "@/db/models/inventories.model";
import InventoryAttribute from "@/types/InventoryType";
import { Optional } from "sequelize";
import Categories from "@/db/models/categories.model";

export default class InventoryController {
  async getAllInventory(): Promise<
    ResponseType<{ rows: Inventories[]; count: number }>
  > {
    try {
      const inventories = await Inventories.findAndCountAll({
        offset: 0,
        limit: 10,
        include: [
          {
            association: "categories",
            attributes: ["id", "category_name"],
            through: { attributes: [] },
          },
          {
            association: "medias",
            attributes: ["id", "type", "url"],
            through: { attributes: [] },
          },
        ],
      });

      return {
        message: "Inventories Fetched Successfully",
        success: true,
        data: inventories,
        statusCode: 200,
      };
    } catch (error) {
      // @ts-ignore
      throw new Error(error?.message);
    }
  }

  async getInventory(id: number): Promise<ResponseType> {
    try {
      const inventory = await Inventories.findByPk(id, {
        include: [
          {
            association: "categories",
            attributes: ["id", "category_name"],
            through: { attributes: [] },
          },
          {
            association: "medias",
            attributes: ["id", "type", "url"],
            through: { attributes: [] },
          },
        ],
      });

      if (!inventory) {
        return {
          message: "Inventory With Given Id Not Exist",
          success: false,
          data: null,
          statusCode: 400,
        };
      }

      return {
        message: "Inventory Fetched Successfully",
        success: true,
        data: inventory,
        statusCode: 200,
      };
    } catch (error) {
      // @ts-ignore
      throw new Error(error?.message);
    }
  }

  async createInventory(
    body: Optional<InventoryAttribute, "id">
  ): Promise<ResponseType> {
    try {
      const inventory = await Inventories.create({
        created_by: body?.created_by,
        description: body?.description,
        name: body?.name,
        price: body?.price,
        quantity: body?.quantity,
      });

      // TODO ? Add Medias
      // TODO ? Add Categories

      if (!inventory) {
        return {
          message: "Inventory Not Created",
          success: false,
          data: null,
          statusCode: 400,
        };
      }

      return {
        message: "Inventory Created Successfully",
        success: true,
        data: inventory,
        statusCode: 201,
      };
    } catch (error) {
      // @ts-ignore
      throw new Error(error?.message);
    }
  }

  async updateInventory(
    id: number,
    body: Optional<InventoryAttribute, "id">
  ): Promise<ResponseType> {
    try {
      // Check If Invetnory isExists
      const inventory = await Inventories.findByPk(id);

      // TODO ? update Medias
      // TODO ? update Categories

      if (!inventory) {
        return {
          message: "Inventory With Given Id not Exists",
          success: false,
          data: null,
          statusCode: 400,
        };
      }

      // update Inventory
      const updatedInventory = await inventory.update({
        description: body?.description,
        name: body?.name,
        price: body?.price,
        quantity: body?.quantity,
      });

      return {
        message: "Inventory Updated Successfully",
        success: true,
        data: updatedInventory,
        statusCode: 201,
      };
    } catch (error) {
      // @ts-ignore
      throw new Error(error?.message);
    }
  }

  async deleteInventory(id: number): Promise<ResponseType> {
    try {
      // Check Is inventory Exist
      const inventory = await Inventories.findByPk(id);

      if (!inventory) {
        return {
          message: "Inventory Not Exists With Given ID",
          success: false,
          data: null,
          statusCode: 400,
        };
      }

      // Soft Delete Inventory
      await inventory.destroy();

      return {
        message: "Inventory Deleted Successfully",
        success: true,
        data: {},
        statusCode: 200,
      };
    } catch (error) {
      // @ts-ignore
      throw new Error(error?.message);
    }
  }
}
