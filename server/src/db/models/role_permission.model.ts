import {
  Table,
  Column, Model, ForeignKey
} from "sequelize-typescript";
import { MediaAttibutes } from "@/types/Media.type";
import Roles from "./roles.model";
import Permissions from "./permissions.model";

@Table({
  tableName: "role_permission",
  timestamps: false,
  modelName: "RolePermission",
})
export default class RolePermission extends Model<MediaAttibutes> {
  @ForeignKey(() => Roles)
  @Column
  declare role_id: number;

  @ForeignKey(() => Permissions)
  @Column
  declare permission_id: number;
}
