import { Router } from "express";
import {
  createProductCont,
  GetProductoCont,
  eliminarProductoCont,
  updateProductoCont,
} from "../controllers/product-controller.js";

const router = Router();


router.post("/createProducto", createProductCont);
router.get("/getProducto",GetProductoCont);
router.delete("/deleteProducto/:id",eliminarProductoCont);
router.put("/updateProducto/:id",updateProductoCont);

export default router;
