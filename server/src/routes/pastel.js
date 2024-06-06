import { Router } from "express";
import {
    createPastel,
    updatePastel,
    getPasteles,
    deletePastel,
    searchPasteles,
} from "../controllers/producto.js";
import { authorize } from "../middlewares/seguridad-middleware.js";

const router = Router();

router.get("/", getPasteles);
router.post("/", authorize, createPastel);
router.patch("/:id", authorize, updatePastel);
router.delete("/:id", authorize, deletePastel);
router.get("/search", searchPasteles);

export default router;
