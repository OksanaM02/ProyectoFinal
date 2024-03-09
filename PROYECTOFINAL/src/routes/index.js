import express from 'express';
import { login } from '../controllers/login-controller.js';
import userRouter from "./user.js";
import productRouter from "./product.js"
import carritoRouter from "./cart.js"
import pedidoRouter from "./pedido.js"

const router = express.Router();

router.post('/login', login);
router.use("/users", userRouter);
router.use("/product", productRouter);
router.use("/carrito", carritoRouter);
router.use("/pedido", pedidoRouter);

export default router;
