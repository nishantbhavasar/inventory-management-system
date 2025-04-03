import Categories from "@/db/models/categories.model";
import { Optional, Op } from "sequelize";
import CategoryAttribute from "../types/Category.type";
import { ResponseType } from "@/types/ResponseType";

export class CategoryController {
    async createCategory(
        body: Optional<CategoryAttribute, "id">
    ): Promise<ResponseType> {
        try {
            const category = await Categories.create({
                category_name: body.category_name,
            });

            if (!category) {
                return {
                    message: "Category Not Created",
                    success: false,
                    data: null,
                    statusCode: 400,
                };
            }

            return {
                message: "category Created Successfully",
                success: true,
                data: category,
                statusCode: 201,
            };
        } catch (error) {
            // @ts-ignore
            throw new Error(error?.message);
        }
    }

    async deleteCategory(id: number): Promise<ResponseType> {
        try {
            // Check Is Category Exist
            const category = await Categories.findByPk(id);

            if (!category) {
                return {
                    message: "category Not Exists With Given ID",
                    success: false,
                    data: null,
                    statusCode: 400,
                };
            }

            // Delete Inventory
            await category.destroy({ force: true });

            return {
                message: "Category Deleted Successfully",
                success: true,
                data: {},
                statusCode: 200,
            };
        } catch (error) {
            // @ts-ignore
            throw new Error(error?.message);
        }
    }

    async getAllcategories(): Promise<ResponseType> {
        try {
            // Check Is inventory Exist
            const categories = await Categories.findAll();

            return {
                message: "Categories Fetched Successfully",
                success: true,
                data: categories,
                statusCode: 200,
            };
        } catch (error) {
            // @ts-ignore
            throw new Error(error?.message);
        }
    }
}
