import { getPagingData, getPagination } from "../configs/pagination.config.js";
import { Product } from "../models/Product.js";
import db from "../configs/db.config.js";
import fs from "fs/promises";

export const productService = {
    read: async (req) => {
        try {
            const Op = db.Sequelize.Op;
            const { page, size, product } = req.query;

            const condition = product
                ? { nama_barang: { [Op.like]: `%${product}%` } }
                : null;

            const { limit, offset } = getPagination(page, size);

            const query = await Product.findAndCountAll({
                where: condition,
                limit,
                offset,
            });

            const response = getPagingData(query, page, limit);

            return response;
        } catch (error) {
            return "err";
        }
    },

    create: async (data) => {
        try {
            return await Product.create(data);
        } catch (error) {
            return "err";
        }
    },

    findOne: async (nama_barang) => {
        try {
            return await Product.findAll({ where: { nama_barang } });
        } catch (error) {
            return "err";
        }
    },

    update: async (data) => {
        try {
            const { nama_barang } = data;

            const query = await Product.update(data, {
                where: { nama_barang },
            });

            if (query[0] === 1) return data;
        } catch (error) {
            return "err";
        }
    },

    destroy: async (nama_barang) => {
        try {
            const check = await Product.findOne({
                where: { nama_barang },
                raw: true,
            });

            await fs.unlink(check.gambar);

            return await Product.destroy({ where: { nama_barang } });
        } catch (error) {
            return "err";
        }
    },
};
