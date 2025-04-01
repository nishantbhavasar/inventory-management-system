import {
  Table,
  Column,
  Model,
  DataType, AllowNull, Unique, AutoIncrement
} from "sequelize-typescript";
import { PermissionsAttribute } from "@/types/RolesType";

@Table({ tableName: "permissions", timestamps: true, modelName: "Permissions" })
export class Permissions extends Model<Partial<PermissionsAttribute>> {

  @AutoIncrement
  @Column({
    type: DataType.NUMBER,
    autoIncrement:true,
    primaryKey: true,
  })
  declare id: number;

  @AllowNull(false)
  @Unique(true)
  @Column({})
  declare permission: string;
}

export default Permissions;
