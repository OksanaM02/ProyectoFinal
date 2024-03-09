import { Router } from "express";
import {
    getUsersCont,
    createUsersCont,
    deleteUserCont,
    updateUserCont,
} from "../controllers/user-controller.js";
import { checkToken } from "../middlewares/auth-middleware.js";

const router = Router();

router.get("/", checkToken,getUsersCont);
router.post("/", createUsersCont);
router.delete("/:username", checkToken,deleteUserCont);
router.patch("/:username", checkToken, updateUserCont);

export default router;
