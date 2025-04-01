import {
  Table,
  Column,
  DataType,
  Model,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from "sequelize-typescript";
import { MEDIA_TYPE } from "@/types/Enum.type";
import { MediaAttibutes } from "@/types/Media.type";

@Table({ tableName: "medias", timestamps: true, modelName: "Medias" })
export default class Media extends Model<MediaAttibutes> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(MEDIA_TYPE.IMAGE, MEDIA_TYPE.VIDEO),
  })
  declare type: typeof MEDIA_TYPE;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare url: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt: Date;
}
