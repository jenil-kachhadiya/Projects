const verifyRole = (...arg) => {
    return (req, res, next) => {
        try {
            if (!req.user || !req.user.role) {
                return res.status(403).json({ message: "Access denied. No role found"});
            }

            if (!arg.includes(req.user.role)) {
                return res.status(403).json({ message: "You are not authorized" });
            }

            next();
        } catch (error) {
            return res.status(500).json({ message: "Role verification failed",
                error: error.message });
        }
    };
};

module.exports = verifyRole;