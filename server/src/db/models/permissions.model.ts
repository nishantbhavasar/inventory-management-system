import {
  Table,
  Column,
  Model,
  DataType, AllowNull, Unique, AutoIncrement,
  PrimaryKey
} from "sequelize-typescript";
import { PermissionsAttribute } from "@/types/RolesType";

@Table({ tableName: "permissions", timestamps: false, modelName: "Permissions" })
export class Permissions extends Model<Partial<PermissionsAttribute>> {

  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement:true,
    primaryKey: true,
  })
  declare id: number;

  @AllowNull(false)
  @Unique(true)
  @Column({type: DataType.STRING,})
  declare permission: string;
}

export default Permissions;
