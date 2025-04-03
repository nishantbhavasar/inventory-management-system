import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";
import Roles from "./roles.model";
import Permissions from "./permissions.model";

@Table({
  tableName: "role_permissions",
  timestamps: false,
  modelName: "RolePermission",
})
export default class RolePermission extends Model {
  @PrimaryKey
  @ForeignKey(() => Roles)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare role_id: number;

  @PrimaryKey
  @ForeignKey(() => Permissions)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare permission_id: number;

  // Define Associations
  @BelongsTo(() => Roles)
  declare Role?: Roles;

  @BelongsTo(() => Permissions)
  declare Permission?: Permissions;
}
