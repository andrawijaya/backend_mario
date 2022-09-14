import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { response } from "../utils/response.util.js";
dotenv.config();

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader.split(" ")[1];

        if (token === null) return response.forbidden(res);
        const decoded = jwt.verify(token, process.env.SEC_ACCESS_TOKEN);

        console.info(decoded);

        if (!decoded) return response.forbidden(res);
        req.username = decoded.username;
        next();
    } catch (error) {
        console.info(error);
        response.forbidden(res);
    }
};
