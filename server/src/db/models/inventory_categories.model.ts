import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Inventories from "./inventories.model";
import Categories from "./categories.model";
import { InventoryCategoriesAttribute } from "@/types/Category.type";

@Table({
  tableName: "inventory_categories",
  timestamps: false,
  modelName: "InventoryCategories",
})
export default class InventoryCategories extends Model<InventoryCategoriesAttribute> {
  @ForeignKey(() => Inventories)
  @Column
  declare inventory_id: number;

  @ForeignKey(() => Categories)
  @Column
  declare category_id: number;
}
