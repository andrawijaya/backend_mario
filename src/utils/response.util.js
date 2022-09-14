export const response = {
    success: (res, data = null) => {
        if (data === null) {
            return res.status(200).json({
                status: 200,
                message: "Ok",
            });
        }
        res.status(200).json({
            status: 200,
            message: "Ok",
            data,
        });
    },
    badRequest: (res) => {
        res.status(400).json({
            status: 400,
            message: "Bad Request!",
        });
    },

    notFound: (res) => {
        res.status(404).json({
            status: 404,
            message: "Not Found!",
        });
    },

    forbidden: (res) => {
        return res.status(403).json({
            status: 403,
            message: "Forbidden",
        });
    },
};
