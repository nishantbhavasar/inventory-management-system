import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Unique,
  AutoIncrement,
  PrimaryKey,
} from "sequelize-typescript";
import RolesAttribute from "@/types/RolesType";

@Table({ tableName: "roles", timestamps: true, modelName: "Roles" })
export class Roles extends Model<Partial<RolesAttribute>> {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
  })
  declare id: number;

  @AllowNull(false)
  @Unique(true)
  @Column({
    type: DataType.STRING,
  })
  declare role: string;
}

export default Roles;