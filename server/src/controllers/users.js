// Importamos las funciones del servicio de base de datos de usuario y la función de encriptación de contraseñas
import {
    getUsers,
    createUser,
    getUserByName,
    deleteUser,
    updateUser,
} from "../services/database/user-db-service.js";
import { encryptPassword } from "../utils/encrypt.js";

export async function getUserMe(req, res, next) {
    try {
        // Asegúrate de que `req.user.username` sea la propiedad correcta según tu implementación
        const username = req.user.username;
        const user = await getUserByName(username);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
}

// Controlador para obtener una lista de usuarios
export async function getUsersController(req, res, next) {
    try {
        // Obtenemos la lista de usuarios con opciones de consulta proporcionadas en req.query
        const users = await getUsers(req.query);
        return res.send(users);
    } catch (error) {
        next(error);
    }
}

// Controlador para crear un nuevo usuario
export async function createUsersController(req, res, next) {
    try {
        // Obtenemos el cuerpo de la solicitud
        const body = req.body;
        // Encriptamos la contraseña antes de guardarla en la base de datos
        body.password = await encryptPassword(body.password);
        // Creamos el nuevo usuario
        const newUser = await createUser({...req.body, role: 'user'});
        return res.status(201).json(newUser);
    } catch (error) {
        // Manejo de errores específicos, como conflictos de duplicación o errores de validación
        if (error.name === 'ValidationError') {
            // Error de validación: campos requeridos faltantes o valores no válidos
            return res.status(400).json({ message: "Error de validación al crear el usuario", error: error.message });
        } else if (error.code === 11000 && error.keyPattern.username) {
            // Error de duplicación: nombre de usuario duplicado
            return res.status(409).json({ message: "El nombre de usuario ya existe" });
        } else {
            // Otros errores
            next(error);
        }
    }
}

// Controlador para eliminar un usuario
export async function deleteUserController(req, res, next) {
    try {
        // Eliminamos el usuario por nombre de usuario
        const user = await deleteUser(req.params.username);
        if (!user) throw new HttpStatusError(404, "El usuario no existe"); // Lanzar error si el usuario no existe
        return res.status(200).send(user);
    } catch (error) {
        next(error);
    }
}

// Controlador para actualizar la información de un usuario
export async function updateUserController(req, res, next) {
    try {
        // Obtenemos el nombre de usuario de los parámetros de la solicitud
        const { username } = req.params;
        // Obtenemos la información actualizada del usuario del cuerpo de la solicitud
        const updatedUserInfo = req.body;

        // Si se está actualizando la contraseña, la encriptamos antes de guardarla
        if (updatedUserInfo.password) {
            updatedUserInfo.password = await encryptPassword(
                updatedUserInfo.password
            );
        }

        // Llamamos a la función de actualización en la base de datos
        const updatedUser = await updateUser(username, updatedUserInfo);

        return res.status(200).send(updatedUser);
    } catch (error) {
        next(error);
    }
}
