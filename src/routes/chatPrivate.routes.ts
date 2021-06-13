import { Router } from "express"
import { sendMessage } from "./../controllers/privateMessage"
import { isAuthenticated } from "../middlewares/Auth"

const router = Router();

router.post("/enviar/:id", isAuthenticated, sendMessage)

export default router;