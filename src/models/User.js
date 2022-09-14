import db from "../configs/db.config.js";
import { DataTypes } from "sequelize";

const User = db.define(
    "User",
    {
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        refresh_token: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: "user",
        timestamps: "true",
    }
);

(() => {
    User.sync();
})();

User === db.model.User;

export default User;
