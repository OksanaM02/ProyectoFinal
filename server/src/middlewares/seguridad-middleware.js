import jwt from "jsonwebtoken";
import config from "../config.js";

export function authorize(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res
            .status(401)
            .json({ message: "Token de autorización no proporcionado" });
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
        return res.status(401).json({ message: "Malformatted token" });
    }
    jwt.verify(token, config.app.secretKey, (err, decoded) => {
        if (err) {
            return res
                .status(403)
                .json({ message: "Token de autorización inválido" });
        } else {
            if (decoded.role !== "admin") {
                return res
                    .status(403)
                    .json({
                        message: "No tienes permiso para acceder a esta ruta",
                    });
            } else {
                next();
            }
        }
    });
}
