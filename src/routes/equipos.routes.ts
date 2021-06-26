import { Router } from "express"
import { createTeam, addUsersToTeam } from "../controllers/equipos.controller";
import { isAuthenticated } from "../middlewares/Auth"

const router = Router();

router.post("/create", isAuthenticated, createTeam)
router.post("/add/:id", isAuthenticated, addUsersToTeam)

export default router;