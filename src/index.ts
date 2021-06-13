import { config } from "./config/config"
import httpServer from "./socket"

httpServer.listen(config.PORT) 