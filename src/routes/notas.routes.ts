import { Router } from "express"
import { createNota, deleteNota, getNotaById, getNotas, updateNota } from "../controllers/notas.controller";
import { isAuthenticated } from "./../middlewares/Auth"
const router = Router()


router.get("/", isAuthenticated , getNotas)
router.get("/:id", isAuthenticated , getNotaById)

router.post("/create", isAuthenticated , createNota)
router.put("/update/:id", isAuthenticated , updateNota)

router.delete("/delete/:id", isAuthenticated , deleteNota)

export default router;