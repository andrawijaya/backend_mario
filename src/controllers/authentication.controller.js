import { authenticationService } from "../services/authentication.service.js";
import { response } from "../utils/response.util.js";

export const login = async (req, res) => {
    try {
        const data = await authenticationService.read(req.body);

        if (data === "err") return response.badRequest(res);

        if (data === "null") return response.notFound(res);

        if (data === "wrongPass") return response.badRequest(res);

        const { accessToken, refreshToken } = data;

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            status: 200,
            message: "Ok",
            accessToken,
        });
    } catch (error) {
        response.badRequest(res);
    }
};

export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return response.forbidden(res);

        const user = await authenticationService.findOneToken(refreshToken);

        if (!user) return response.badRequest(res);

        await authenticationService.clearToken(user.username);

        res.clearCookie("refreshToken");

        response.success(res);
    } catch (error) {
        response.badRequest(res);
    }
};
