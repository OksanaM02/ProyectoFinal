import { Router } from "express";
import {
    getUsersController,
    createUsersController,
    getUserMe,
    deleteUserController,
    updateUserController,
} from "../controllers/users.js";
import { checkToken } from "../middlewares/auth-middleware.js";
import { authorize } from "../middlewares/seguridad-middleware.js";

const router = Router();
router.get("/me", checkToken, getUserMe);
router.get("/", checkToken, authorize, getUsersController);
router.post("/", createUsersController);
router.delete("/:username", checkToken, authorize, deleteUserController);
router.patch("/:username", checkToken, updateUserController);

export default router;
