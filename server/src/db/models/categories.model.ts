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
import { MEDIA_TYPE } from "@/types/Enum.type";
import { MediaAttibutes } from "@/types/Media.type";

@Table({ tableName: "medias", timestamps: true, modelName: "Medias" })
export default class Media extends Model<MediaAttibutes> {
  
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

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class categories extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   categories.init({
//     category_name: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'categories',
//   });
//   return categories;
// };
