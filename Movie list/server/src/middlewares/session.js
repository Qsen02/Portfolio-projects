const { verifyToken } = require("../services/token");

function session() {
    return function(req, res, next) {
        const token = req.headers["x-authorization"];
        if (token) {
            try {
                const payload = verifyToken(token);
                res.user = payload;
            } catch (err) {
                return res.status(403).json({ message: "You dont't have credentialsq please login or register!" });
            }
        }
        next();
    }
}

module.exports = {
    session
}