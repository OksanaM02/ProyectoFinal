import { Router } from "express";
import {
    finalizarCompra,
    obtenerComprasPorUsuario,
    obtenerTodasLasCompras,
} from "../controllers/compraFinalizada.js";
import { authorize } from "../middlewares/seguridad-middleware.js";
import { verificarToken } from "../middlewares/middlewareDeAutenticacion.js";
const router = Router();
router.post("/finalizarCompra", verificarToken, finalizarCompra);
router.get(
    "/obtenerTodasLasCompras",
    verificarToken,
    authorize,
    obtenerTodasLasCompras
);
router.get(
    "/obtenerComprasPorUsuario",
    verificarToken,
    obtenerComprasPorUsuario
);

export default router;
