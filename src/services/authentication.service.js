import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();

export const authenticationService = {
    read: async (data) => {
        try {
            const query = await User.findOne({
                where: { username: data.username },
                raw: true,
            });
            if (query === null) return "null";

            const checkDecrypt = await bcrypt.compare(
                data.password,
                query.password
            );

            if (!checkDecrypt) return "wrongPass";

            const refreshToken = jwt.sign(
                { username: query.username },
                process.env.SEC_REFRESH_TOKEN,
                { expiresIn: "1d" }
            );

            const accessToken = jwt.sign(
                { username: query.username },
                process.env.SEC_ACCESS_TOKEN,
                { expiresIn: "60m" }
            );

            await User.update(
                { refresh_token: refreshToken },
                { where: { username: data.username } }
            );

            return { accessToken, refreshToken };
        } catch (error) {
            return "err";
        }
    },

    findOne: async (username) => {
        try {
            return await User.findOne({ where: { username } });
        } catch (error) {
            return "err";
        }
    },

    findOneToken: async (refreshToken) => {
        try {
            return await User.findOne({
                where: { refresh_token: refreshToken },
                raw: true,
            });
        } catch (error) {
            return "err";
        }
    },

    refreshToken: async (token) => {
        const query = await User.findOne({
            where: { refresh_token: token },
            attributes: ["refresh_token", "username"],
        });
        if (!query) return null;

        const { username } = query;
        const accessToken = jwt.sign(
            { username },
            process.env.SEC_ACCESS_TOKEN,
            {
                expiresIn: "60m",
            }
        );
        return accessToken;
    },

    clearToken: async (username) => {
        try {
            await User.update({ refresh_token: null }, { where: { username } });
        } catch (error) {
            return "err";
        }
    },
};
