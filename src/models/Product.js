import { DataTypes } from "sequelize";
import db from "../configs/db.config.js";

export const Product = db.define(
    "Product",
    {
        nama_barang: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false,
        },
        harga_beli: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        harga_jual: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        gambar: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        stok: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
    },
    {
        tableName: "product",
        timestamps: true,
    }
);

(() => {
    db.sync();
})();

Product === db.model.Product;
