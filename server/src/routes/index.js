import express from "express";
import { login } from "../controllers/login.js";
import userRouter from "./user.js";
import pastelRouter from "./pastel.js"; // Asegúrate que el nombre del archivo importado sea el correcto
import comprasRouter from "./carrito.js";
import compraFinalizadaRouter from "./compraFinalizada.js";

const router = express.Router();

router.post("/login", login);
router.use("/users", userRouter);
router.use("/pasteles", pastelRouter);
router.use("/carrito", comprasRouter);
router.use("/compraFinalizada", compraFinalizadaRouter);

export default router;
