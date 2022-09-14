import { productService } from "../services/product.service.js";
import { response } from "../utils/response.util.js";
import * as dotenv from "dotenv";
dotenv.config();

export const read = async (req, res) => {
    try {
        const data = await productService.read(req);

        if (data === "err") return response.badRequest(res);

        response.success(res, data);
    } catch (error) {
        response.badRequest(res);
    }
};

export const create = async (req, res) => {
    try {
        const err = new Error();
        if (!req.file) throw err;

        req.body.gambar = `${process.env.BASE_URL}${req.file.path}`;

        req.body.nama_barang = req.body.nama_barang.split(" ").join("-");

        const data = await productService.create(req.body);

        if (data === "err") return response.badRequest(res);

        response.success(res);
    } catch (error) {
        console.info(error);
        response.badRequest(res);
    }
};

export const findOne = async (req, res) => {
    try {
        const data = await productService.findOne(req.params.product);

        if (data === "err") return response.badRequest(res, data);

        if (data.length < 1) return response.notFound(res);

        response.success(res, data);
    } catch (error) {
        response.badRequest(res);
    }
};

export const update = async (req, res) => {
    try {
        const checkData = await productService.findOne(req.body.nama_barang);

        if (checkData.length < 1) return response.notFound(res);

        const err = new Error();
        if (!req.file) throw err;

        req.body.gambar = `${process.env.BASE_URL}${req.file.path}`;

        const data = await productService.update(req.body);

        if (data === "err") return response.badRequest(res);

        response.success(res, data);
    } catch (error) {
        response.badRequest(res);
    }
};

export const destroy = async (req, res) => {
    try {
        const checkData = await productService.findOne(req.body.nama_barang);

        if (checkData.length < 1) return response.notFound(res);

        const data = await productService.destroy(req.body.nama_barang);

        if (data === "err") return response.badRequest(res);

        response.success(res);
    } catch (error) {
        response.badRequest(res);
    }
};
