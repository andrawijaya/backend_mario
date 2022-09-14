import User from "../models/User.js";
import bcrypt from "bcrypt";

export const registerService = {
    create: async (data) => {
        try {
            bcrypt.hash(data.password, 10, async (err, hash) => {
                if (err) return "err";
                data.password = hash;
                return await User.create(data);
            });
        } catch (error) {
            return "err";
        }
    },
};
