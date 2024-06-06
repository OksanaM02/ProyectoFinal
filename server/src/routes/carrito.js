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
router.get("/vercarrito", verificarToken, obtenerCarrito); // Obtener el carrito de compras de un usuario
router.post("/addItem", verificarToken, addItemAlCarrito); // Añadir un ítem al carrito de compras
router.patch("/updateItem", verificarToken, actualizarCantidadItem); // Actualizar la cantidad de un ítem en el carrito
router.delete("/removeItem", verificarToken, eliminarItemDelCarrito); // Eliminar un ítem del carrito
router.post("/vaciarCarrito", verificarToken, vaciarCarrito); // Vaciar el carrito de compras de un usuario
export default router;
