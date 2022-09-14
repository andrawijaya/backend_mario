import express from "express";
import { refreshToken } from "../controllers/refreshToken.controller.js";

const route = express.Router();

route.get("/refresh-token", refreshToken);

export default route;
