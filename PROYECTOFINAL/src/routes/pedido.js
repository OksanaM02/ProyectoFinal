import { Router } from "express";
import {
  crearPedidoCont,
  obtenerPedidosCont,
  eliminarPedidoCont
}  from "../controllers/pedido-controller.js";

const router = Router();

router.post('/addPedido', crearPedidoCont);
router.delete('/eliminar/:id', eliminarPedidoCont);
router.get('/verPedidos', obtenerPedidosCont);

export default router;
