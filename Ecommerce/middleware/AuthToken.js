const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
    try {
        let authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({ message: "Token not found" });
        }

        let token = authorization.split(" ")[1];

        let decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
            error: error.message
        });
    }
};