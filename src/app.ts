// El archivo app funcioan para poder realizar las configuraciones del servidor
import express from 'express';
import morgan from "morgan"
import cors from "cors";
import { createConnection } from "typeorm";

import authRoutes from "./routes/auth.routes"
import notasRoutes from "./routes/notas.routes"
import notificationsRoutes from "./routes/notifications.routes"
import usersRoutes from "./routes/users.routes"
import { IncomingHttpHeaders } from 'http';

// # TODO # Se necesita mejorar el codigo de "notas"
// # TODO # Iniciar con las tablas de grupos

const app = express()

createConnection() // crea una conexion con la base de datos => ormconfig.json
app.use(cors()); // permite poder interactuar con las rutas del servidor web
app.use(morgan("dev")); // muestra las peticiones que se van realizando a la api
app.use(express.json()) // para que express pueda interpretar los obj json que vienen del servidor

declare module 'http' {
  interface IncomingHttpHeaders {
      "token"?: string
  }
}

app.get("/", (req, res) => {
  res.json({ mensaje: "welcome"})
})

app.use(authRoutes)
app.use("/notifications", notificationsRoutes)
app.use("/notas", notasRoutes)

export default app;