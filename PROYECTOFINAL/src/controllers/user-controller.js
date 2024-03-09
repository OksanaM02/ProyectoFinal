// Importamos las funciones del servicio de base de datos de usuario y la función de encriptación de contraseñas
import {
  getUsers,
  createUsers,
  deleteUser,
  updateUser,
} from "../services/database/User-db-service.js";
import { encryptPassword } from "../utils/encrypt.js";

export async function getUsersCont(req, res, next) {
  try {
    // Obtenemos la lista de usuarios con opciones de consulta proporcionadas en req.query
    const users = await getUsers(req.query);
    return res.send(users);
} catch (error) {
    next(error);
}
}

export async function createUsersCont(req, res, next) {
  try {

      const body = req.body;
      body.password = await encryptPassword(body.password);
      const users = await createUsers(req.body);
      return res.status(201).send(users);
  } catch (error) {
      if (error.code === 11000) {
          error.status = 409;
      }
      if (error.message.includes("validation")) {
          error.status = 400;
      }
      next(error);
  }
}

export async function deleteUserCont(req, res, next) {
  try {
      const user = await deleteUser(req.params.username);
      if (!user) throw new HttpStatusError(404, "El usuario no existe");
      return res.status(200).send(user);
  } catch (error) {
      next(error);
  }
}

export async function updateUserCont(req, res, next) {
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
