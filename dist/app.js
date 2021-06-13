"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// El archivo app funcioan para poder realizar las configuraciones del servidor
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var typeorm_1 = require("typeorm");
var auth_routes_1 = __importDefault(require("./routes/auth.routes"));
var notas_routes_1 = __importDefault(require("./routes/notas.routes"));
var notifications_routes_1 = __importDefault(require("./routes/notifications.routes"));
// # TODO # Se necesita mejorar el codigo de "notas"
// # TODO # Iniciar con las tablas de grupos
var app = express_1.default();
typeorm_1.createConnection(); // crea una conexion con la base de datos => ormconfig.json
app.use(cors_1.default()); // permite poder interactuar con las rutas del servidor web
app.use(morgan_1.default("dev")); // muestra las peticiones que se van realizando a la api
app.use(express_1.default.json()); // para que express pueda interpretar los obj json que vienen del servidor
app.get("/", function (req, res) {
    res.json({ mensaje: "welcome" });
});
app.use(auth_routes_1.default);
app.use("/notifications", notifications_routes_1.default);
app.use("/notas", notas_routes_1.default);
exports.default = app;
