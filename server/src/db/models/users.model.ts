import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  AllowNull, Unique,
  Default, DeletedAt,
  ForeignKey,
  AutoIncrement,
  HasOne,
  BelongsTo
} from "sequelize-typescript";
import { UserAttribute } from "@/types/UserTypes";
import Roles from "./roles.model";

@Table({ tableName: "users", timestamps: true, modelName: "Users" })
export default class Users extends Model<Partial<UserAttribute>> {
  
  @AutoIncrement
  @Column({
    type: DataType.NUMBER,
    autoIncrement:true,
    primaryKey: true,
  })
  declare id: number;

  @AllowNull(true)
  @Column({})
  declare name: string;

  @AllowNull(false)
  @Unique(true)
  @Column({})
  declare email: string;

  @AllowNull(false)
  @Column({})
  declare password: string;

  @AllowNull(false)
  @ForeignKey(() => Roles)
  @Default(3) // 3 -> USER
  @Column({})
  declare role_id: number;

  @BelongsTo(() => Roles)
  declare role: Roles;

  @AllowNull(false)
  @Default(true)
  @Column({})
  declare is_active: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt: Date;
}
