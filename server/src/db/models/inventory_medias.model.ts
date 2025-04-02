import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import { InventoryMediasAttributetoryMedias } from "@/types/Media.type";
import Inventories from "./inventories.model";
import Media from "./media.model";

@Table({
  tableName: "inventory_medias",
  timestamps: false,
  modelName: "InventoryMedias",
})
export default class InventoryMedias extends Model<InventoryMediasAttributetoryMedias> {
  @ForeignKey(() => Inventories)
  @Column
  declare inventory_id: number;

  @ForeignKey(() => Media)
  @Column
  declare media_id: number;
}
