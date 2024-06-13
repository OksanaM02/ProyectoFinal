
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

export async function getUsersController(req, res, next) {
    try {

        const users = await getUsers(req.query);
        return res.send(users);
    } catch (error) {
        next(error);
    }
}
export async function createUsersController(req, res, next) {
    try {

        const body = req.body;

        body.password = await encryptPassword(body.password);

        const existingUser = await getUserByName(body.username);
        if (existingUser) {
            return res.status(409).json({ message: "El nombre de usuario ya existe" });
        }

        const newUser = await createUser({
            ...body,
            role: 'user',
            address: {
                street: body.street,
                city: body.city,
                state: body.state,
                zip: body.zip
            }
        });

        return res.status(201).json(newUser);
    } catch (error) {

        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: "Error de validación al crear el usuario", error: error.message });
        } else {
            next(error);
        }
    }
}


export async function deleteUserController(req, res, next) {
    try {
        const user = await deleteUser(req.params.username);
        if (!user) throw new HttpStatusError(404, "El usuario no existe");
        return res.status(200).send(user);
    } catch (error) {
        next(error);
    }
}
export async function updateUserController(req, res, next) {
    try {
        const { username } = req.params;
        const updatedUserInfo = req.body;
        if (updatedUserInfo.password) {
            updatedUserInfo.password = await encryptPassword(
                updatedUserInfo.password
            );
        }
        const updatedUser = await updateUser(username, updatedUserInfo);

        return res.status(200).send(updatedUser);
    } catch (error) {
        next(error);
    }
}
