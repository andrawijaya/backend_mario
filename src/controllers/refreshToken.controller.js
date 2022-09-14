import { authenticationService } from "../services/authentication.service.js";
import { response } from "../utils/response.util.js";

export const refreshToken = async (req, res) => {
    try {
        console.log(req.cookies.refreshToken);
        const accessToken = await authenticationService.refreshToken(
            req.cookies.refreshToken
        );

        if (accessToken === null) return response.forbidden(res);
        res.status(200).json({
            status: 200,
            message: "success",
            accessToken,
        });
    } catch (error) {
        response.forbidden(res);
        console.log(error);
    }
};
