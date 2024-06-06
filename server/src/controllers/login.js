// Importamos las dependencias necesarias
import { HttpStatusError } from "common-errors";
import jwt from "jsonwebtoken";
import { getUserByName } from "../services/database/user-db-service.js";
import config from "../config.js";
import { checkHash } from "../utils/encrypt.js";

// Controlador para el proceso de inicio de sesión
export async function login(req, res, next) {
    // Obtenemos el nombre de usuario y contraseña de la solicitud
    const { username, password } = req.body;

    try {
        // Buscamos el usuario por nombre de usuario en la base de datos
        const user = await getUserByName(username);

        // Verificamos si el usuario existe y las credenciales son válidas
        if (user) {
            // Comparamos la contraseña proporcionada con la almacenada en la base de datos
            if (checkHash(password, user.password)) {
                // Si las credenciales son válidas, creamos un token de autenticación JWT
                const userInfo = { id: user._id, username: user.username, role: user.role };
                const jwtConfig = { expiresIn: 60 * 60 }; // Configuración del token: expira en 1 hora
                const token = jwt.sign(
                    userInfo,
                    config.app.secretKey, // Clave secreta para firmar el token, obtenida de la configuración
                    jwtConfig
                );
                // Devolvemos el token como respuesta
                return res.send({ token });
            }
        }

        // Si las credenciales son inválidas, lanzamos un error de estado 401
        throw new HttpStatusError(401, "Invalid credentials");
    } catch (error) {
        next(error); // Pasamos el error al siguiente middleware para su manejo
    }
}
