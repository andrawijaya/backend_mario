import { response } from "../utils/response.util.js";
import { registerService } from "../services/register.service.js";

export const register = async (req, res) => {
    try {
        const data = await registerService.create(req.body);

        if (data === "err") return response.success(res);

        response.success(res);
    } catch (error) {
        response.badRequest(res);
    }
};
