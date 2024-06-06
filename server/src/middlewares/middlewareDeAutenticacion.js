// middlewareDeAutenticacion.js

import jwt from "jsonwebtoken";
import config from "../config.js";

export function verificarToken(req, res, next) {
    // Obtener el token del header 'Authorization'
    let token = req.headers["authorization"];

    // Verifica si el token fue enviado
    if (!token) {
        return res
            .status(403)
            .send({ message: "Se requiere un token para autenticación" });
    }

    // Opcionalmente, puedes remover el prefijo 'Bearer ' si estás usando uno
    if (token.startsWith("Bearer ")) {
        // Remueve 'Bearer ' para obtener el token puro
        token = token.slice(7, token.length);
    }

    try {
        // Verifica el token con la clave secreta
        const decoded = jwt.verify(token, config.app.secretKey);
        // Si es válido, adjunta los datos decodificados a req.user
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({ message: "Token inválido o expirado" });
    }
}
