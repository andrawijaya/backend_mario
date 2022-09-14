import express from "express";
import { login, logout } from "../controllers/authentication.controller.js";

import validate from "../middlewares/validate.middleware.js";
import validation from "../utils/validation.util.js";

const route = express.Router();

route.post(
    "/authentication",
    validate([validation.username(false), validation.password()]),
    login
);

route.delete("/logout", logout);

export default route;
