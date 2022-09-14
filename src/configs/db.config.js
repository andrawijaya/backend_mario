import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.ORM_HOST,
        dialect: process.env.ORM_DIALECT,
        // dialectOptions: { ssl: {} },
    }
);

export default db;
