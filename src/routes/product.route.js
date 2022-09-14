import express from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import validation from "../utils/validation.util.js";
import {
    read,
    create,
    findOne,
    update,
    destroy,
} from "../controllers/product.controller.js";
import validate from "../middlewares/validate.middleware.js";

const route = express.Router();

route.get("/products", verifyToken, read);
route.post(
    "/products",
    validate([
        validation.namaBarang(),
        validation.hargaBeli(),
        validation.hargaJual(),
        validation.gambar(),
        validation.stok(),
    ]),
    create
);
route.get("/products/:product", findOne);
route.put(
    "/products",
    validate([
        validation.namaBarang(true),
        validation.hargaBeli(),
        validation.hargaJual(),
        validation.gambar(),
        validation.stok(),
    ]),
    update
);
route.delete("/products", destroy);

export default route;
