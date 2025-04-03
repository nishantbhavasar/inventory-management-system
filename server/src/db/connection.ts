import { Sequelize } from "sequelize-typescript";
const sequelize = new Sequelize({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT as "postgres",
  models: [__dirname + "/models"],
  logging:false
});
export default sequelize;
