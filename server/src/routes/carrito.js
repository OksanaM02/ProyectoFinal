import { Router } from "express";
import {
    addItemAlCarrito,
    eliminarItemDelCarrito,
    actualizarCantidadItem,
    obtenerCarrito,
    vaciarCarrito,
} from "../controllers/carrito.js";

import { verificarToken } from "../middlewares/middlewareDeAutenticacion.js";
const router = Router();
router.get("/vercarrito", verificarToken, obtenerCarrito);
router.post("/addItem", verificarToken, addItemAlCarrito);
router.patch("/updateItem", verificarToken, actualizarCantidadItem);
router.delete("/removeItem", verificarToken, eliminarItemDelCarrito);
router.post("/vaciarCarrito", verificarToken, vaciarCarrito);
export default router;

