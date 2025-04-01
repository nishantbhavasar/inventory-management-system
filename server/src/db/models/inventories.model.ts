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
  BelongsTo
} from "sequelize-typescript";
import { MEDIA_TYPE } from "@/types/Enum.type";
import { MediaAttibutes } from "@/types/Media.type";
import Users from "./users.model";

@Table({ tableName: "inventories", timestamps: true, modelName: "inventories" })
export default class Inventories extends Model<MediaAttibutes> {
  
  @AutoIncrement
  @Column({
    type: DataType.NUMBER,
    primaryKey: true,
    autoIncrement:true
  })
  declare id: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  declare name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING
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
  @ForeignKey(()=>Users)
  declare created_by: number;

  @BelongsTo(()=>Users)
  declare createdBy:Users;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt: Date;
}