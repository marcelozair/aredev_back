import { createServer } from "http";
import { Server, Socket } from "socket.io"
import app from "./app"

import { getRepository } from "typeorm"
import { users } from "./entity/Users"
import { notifications } from "./entity/Notifications"
import { userNotification } from "./entity/UserNotification";
import { config } from "./config/config";


const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: { origin: config.URL_FRONT },
});

io.on("connection", (socket: Socket) => {

  socket.on("conectado", async (id: number) => {
    const user = await getRepository(users).findOne(id)
    const userList = await getRepository(users).find()
    let result = null;
    if (user) {
      const payloadNotification = {
        type: 1,
        message: "El usuario " + user.name + " se a conectado",
        user_id: user.id,
        level: 1,
        reason: ""
      }

      result = await getRepository(notifications).save(payloadNotification)

      for (let user_tmp of userList) {
        const payloadUserNotification = {
          user_id: user_tmp.id,
          notifications_id: result.id,
          view: 0
        }

        await getRepository(userNotification).save(payloadUserNotification)
      }

    }

    console.log("emit user new conetion", result?.user_id)
    io.emit("conectados", result)
  })

})


export default httpServer