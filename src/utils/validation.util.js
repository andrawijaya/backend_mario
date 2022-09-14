import { body, check } from "express-validator";
import { authenticationService } from "../services/authentication.service.js";
import { productService } from "../services/product.service.js";

const validation = {
    namaBarang: (update = false) => {
        return body("nama_barang")
            .custom(async (value) => {
                return productService
                    .findOne(value.split(" ").join("-"))
                    .then((product) => {
                        if (update === false) {
                            console.info(product);
                            if (product.length > 0) {
                                return Promise.reject("product already in");
                            }
                        } else {
                            if (!product) {
                                return Promise.reject(
                                    "Please input correctfully"
                                );
                            }
                        }
                    });
            })
            .notEmpty();
    },

    hargaBeli: () => {
        return body("harga_beli").notEmpty();
    },

    hargaJual: () => {
        return body("harga_jual").notEmpty();
    },
    gambar: () => {
        return check("gambar")
            .custom((value, { req }) => {
                if (
                    req.file.mimetype === "image/jpg" ||
                    req.file.mimetype === "image/png"
                ) {
                    return true;
                } else {
                    return false;
                }
            })
            .withMessage("Please only submit png/jpg documents.")
            .custom((value, { req }) => {
                if (req.file.size > 102400) {
                    return false;
                } else {
                    return true;
                }
            })
            .withMessage("Please input image under 100kb");
    },
    stok: () => {
        return body("stok").notEmpty();
    },
    username: (register = true) => {
        return body("username")
            .custom(async (value) => {
                return authenticationService.findOne(value).then((user) => {
                    if (register === true) {
                        if (user) {
                            return Promise.reject("Username already in use");
                        }
                    } else {
                        if (!user) {
                            return Promise.reject("Username not found!");
                        }
                    }
                });
            })
            .notEmpty();
    },
    password: () => {
        return body("password").notEmpty().isLength({ min: 4 });
    },
};

export default validation;
