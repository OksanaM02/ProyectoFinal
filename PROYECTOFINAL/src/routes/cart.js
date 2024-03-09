import { Router } from "express";
import {
  agregarAlCarritoCont,
  eliminarDelCarritoCont,
  obtenerDetallesDelCarritoCont
}  from "../controllers/cart-controller.js";

const router = Router();

router.post('/agregar/:id', agregarAlCarritoCont);
router.delete('/eliminar/:id', eliminarDelCarritoCont);
router.get('/detalles', obtenerDetallesDelCarritoCont);

export default router;
