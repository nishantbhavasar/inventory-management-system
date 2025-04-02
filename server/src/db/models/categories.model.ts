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
} from "sequelize-typescript";
import CategoryAttribute from "@/types/Category.type";

@Table({ tableName: "categories", timestamps: true, modelName: "Categories" })
export default class Categories extends Model<CategoryAttribute> {
  
  @AutoIncrement
  @Column({
    type: DataType.NUMBER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare category_name: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt: Date;
}