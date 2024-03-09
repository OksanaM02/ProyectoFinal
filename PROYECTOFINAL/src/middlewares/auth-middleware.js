import jwt from "jsonwebtoken";
import config from "../config.js";

export function checkToken(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "No token provided" });
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
        return res.status(401).json({ message: "Malformatted token" });
    }

    try {
        const decoded = jwt.verify(token, config.app.secretKey);
        req.user = { username: decoded.username };
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
