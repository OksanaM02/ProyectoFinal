// Importamos las dependencias necesarias
import { HttpStatusError } from "common-errors";
import jwt from "jsonwebtoken";
import { getUserByName } from "../services/database/user-db-service.js";
import config from "../config.js";
import { checkHash } from "../utils/encrypt.js";

export async function login(req, res, next) {
    const { username, password } = req.body;

    try {
        const user = await getUserByName(username);
        if (user) {
            if (checkHash(password, user.password)) {
                const userInfo = { id: user._id, username: user.username, role: user.role };
                const jwtConfig = { expiresIn: 60 * 60 };
                const token = jwt.sign(
                    userInfo,
                    config.app.secretKey,
                    jwtConfig
                );
                return res.send({ token });
            }
        }
        throw new HttpStatusError(401, "Invalid credentials");
    } catch (error) {
        next(error);
    }
}
