import { ResponseType } from "@/types/ResponseType";
import Inventories from "@/db/models/inventories.model";
import InventoryAttribute from "@/types/InventoryType";
import { Op, Optional } from "sequelize";
import InventoryMedias from "@/db/models/inventory_medias.model";
import { uploadImageToImgDD } from "@/helper/uploadImage";
import InventoryCategories from "@/db/models/inventory_categories.model";
import Media from "@/db/models/media.model";
import { MEDIA_TYPE } from "@/types/Enum.type";
import CreateInventoryAttribute from "@/types/InventoryType";

export default class InventoryController {
  async getAllInventory(body: {
    limit: number;
    page: number;
    search: string;
  }): Promise<ResponseType<{ rows: Inventories[]; count: number }>> {
    try {
      const page = body?.page ?? 1;
      const limit = body?.limit ?? 10;
      const offset = (page - 1) * limit;
      const search = body?.search?.trim() ?? "";
      const inventories = await Inventories.findAll({
        offset,
        limit,
        where: {
          [Op.or]: {
            name: {
              [Op.iLike]: `%${search}%`,
            },
            description: {
              [Op.iLike]: `%${search}%`,
            },
          },
        },
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
      const count = await Inventories.count({
        where: {
          [Op.or]: {
            name: {
              [Op.iLike]: `%${search}%`,
            },
            description: {
              [Op.iLike]: `%${search}%`,
            },
          },
        },
      });

      return {
        message: "Inventories Fetched Successfully",
        success: true,
        data: {
          count,
          rows: inventories,
        },
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
    body: Optional<CreateInventoryAttribute, "id">,
    created_by: number
  ): Promise<ResponseType> {
    try {
      // Step 1: Create inventory
      const inventory = await Inventories.create({
        created_by: created_by,
        description: body?.description,
        name: body?.name,
        price: body?.price,
        quantity: body?.quantity,
      });

      if (!inventory) {
        return {
          message: "Inventory Not Created",
          success: false,
          data: null,
          statusCode: 400,
        };
      }

      // Step 2: Upload Images & Associate with Inventory
      if (body?.images && Array.isArray(body.images)) {
        await Promise.all(
          body?.images?.map?.(async (image) => {
            const uploadResult = (await uploadImageToImgDD("inventory", image)) as {
              Location: string;
              success: boolean;
            };

            if (uploadResult.success) {
              const media = await Media.create({
                type: MEDIA_TYPE.IMAGE,
                url: uploadResult.Location,
              });

              return await InventoryMedias.create({
                inventory_id: inventory.id,
                media_id: Number(media.id), // Now properly assigned as a number
              });
            }
            return null;
          })
        );
      }


      // Step 3: Associate Categories with Inventory
      if (body?.categories && Array.isArray(body?.categories)) {
        await Promise.all(
          body?.categories.map(async (id: number) => {
            return await InventoryCategories.create({
              inventory_id: inventory.id,
              category_id: id,
            });
          })
        );
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

      // Upload Images & Associate with Inventory
      if (body?.images && Array.isArray(body.images)) {
        await Promise.all(
          body?.images?.map?.(async (image) => {
            const uploadResult = (await uploadImageToImgDD("inventory", image)) as {
              Location: string;
              success: boolean;
            };

            if (uploadResult.success) {
              const media = await Media.create({
                type: MEDIA_TYPE.IMAGE,
                url: uploadResult.Location,
              });

              return await InventoryMedias.create({
                inventory_id: id,
                media_id: Number(media.id),
              });
            }
            return null;
          })
        );
      }

      // Delete all existing categories
      await InventoryCategories.destroy({ where: { inventory_id: id }, force: true });
      if (body?.categories && Array.isArray(body?.categories)) {
        const inventoryCategories = body?.categories.map((category_id: number) => ({
          inventory_id: Number(id),
          category_id: Number(category_id),
        }))
        console.clear()
        console.log({ inventoryCategories });
        const anw = await InventoryCategories.bulkCreate(inventoryCategories)
        console.log({ anw });
      }
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
