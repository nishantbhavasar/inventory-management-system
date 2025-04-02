import {
  Table,
  Column,
  DataType,
  Model,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  AutoIncrement,
  ForeignKey,
  BelongsTo, BelongsToMany
} from "sequelize-typescript";
import Users from "./users.model";
import Media from "./media.model";
import Categories from "./categories.model";
import InventoryMedias from "./inventory_medias.model";
import InventoryCategories from "./inventory_categories.model";
import InventoryAttribute from "@/types/InventoryType";

@Table({ tableName: "inventories", timestamps: true, modelName: "inventories" })
export default class Inventories extends Model<InventoryAttribute> {
  @AutoIncrement
  @Column({
    type: DataType.NUMBER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare description: string;

  @AllowNull(false)
  @Column({
    type: DataType.DOUBLE,
  })
  declare price: number;

  @AllowNull(false)
  @Column({
    type: DataType.NUMBER,
  })
  declare quantity: number;

  @AllowNull(false)
  @Column({
    type: DataType.NUMBER,
  })
  @ForeignKey(() => Users)
  declare created_by: number;

  @BelongsTo(() => Users)
  declare createdBy: Users;

  @BelongsToMany(() => Media, () => InventoryMedias)
  declare medias: Media;

  @BelongsToMany(() => Categories, () => InventoryCategories)
  declare categories: Categories;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt: Date;
}
