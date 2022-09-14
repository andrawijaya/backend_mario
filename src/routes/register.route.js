import express from "express";
import { register } from "../controllers/register.controller.js";
import validate from "../middlewares/validate.middleware.js";
import validation from "../utils/validation.util.js";

const route = express.Router();

route.post(
    "/register",
    validate([validation.username(), validation.password()]),
    register
);

export default route;
