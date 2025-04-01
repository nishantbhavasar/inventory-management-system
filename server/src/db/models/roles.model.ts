import {
  Table,
  Column,
  Model,
  DataType, AllowNull, Unique, AutoIncrement
} from "sequelize-typescript";
import RolesAttribute from "@/types/RolesType";

@Table({ tableName: "roles", timestamps: true, modelName: "Roles" })
export class Roles extends Model<Partial<RolesAttribute>> {


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
  declare role: string;
}

export default Roles;