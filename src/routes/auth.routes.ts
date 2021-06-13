import { Router } from "express"
import { signup , signin , validatioToken} from "../controllers/auth.controller";
const router = Router()

router.post("/signup", signup)
router.post("/signin", signin)

router.get("/token", validatioToken)

export default router;