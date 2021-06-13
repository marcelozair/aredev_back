import { Router } from "express"
import { getUser } from "./../controllers/users.controller"
const router = Router()

router.get("/:id", getUser)

export default router;