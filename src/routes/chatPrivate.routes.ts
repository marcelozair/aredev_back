import { Router } from "express"
import { deleteMessage, sendMessage , getAllMessage} from "./../controllers/privateMessage"
import { isAuthenticated } from "../middlewares/Auth"

const router = Router();

router.get("/all/user/:id", isAuthenticated, getAllMessage)
router.post("/enviar/:id", isAuthenticated, sendMessage)
router.delete("/eliminar/:id", isAuthenticated, deleteMessage)

export default router;