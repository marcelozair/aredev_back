"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var app_1 = __importDefault(require("./app"));
var typeorm_1 = require("typeorm");
var Users_1 = require("./entity/Users");
var Notifications_1 = require("./entity/Notifications");
var UserNotification_1 = require("./entity/UserNotification");
var config_1 = require("./config/config");
var httpServer = http_1.createServer(app_1.default);
var io = new socket_io_1.Server(httpServer, {
    cors: { origin: config_1.config.URL_FRONT },
});
io.on("connection", function (socket) {
    socket.on("conectado", function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var user, userList, result, payloadNotification, userList_1, userList_1_1, user_tmp, payloadUserNotification, e_1_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.users).findOne(id)];
                case 1:
                    user = _b.sent();
                    return [4 /*yield*/, typeorm_1.getRepository(Users_1.users).find()];
                case 2:
                    userList = _b.sent();
                    result = null;
                    if (!user) return [3 /*break*/, 11];
                    payloadNotification = {
                        type: 1,
                        message: "El usuario " + user.name + " se a conectado",
                        user_id: user.id,
                        level: 1,
                        reason: ""
                    };
                    return [4 /*yield*/, typeorm_1.getRepository(Notifications_1.notifications).save(payloadNotification)];
                case 3:
                    result = _b.sent();
                    _b.label = 4;
                case 4:
                    _b.trys.push([4, 9, 10, 11]);
                    userList_1 = __values(userList), userList_1_1 = userList_1.next();
                    _b.label = 5;
                case 5:
                    if (!!userList_1_1.done) return [3 /*break*/, 8];
                    user_tmp = userList_1_1.value;
                    payloadUserNotification = {
                        user_id: user_tmp.id,
                        notifications_id: result.id,
                        view: 0
                    };
                    return [4 /*yield*/, typeorm_1.getRepository(UserNotification_1.userNotification).save(payloadUserNotification)];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7:
                    userList_1_1 = userList_1.next();
                    return [3 /*break*/, 5];
                case 8: return [3 /*break*/, 11];
                case 9:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 11];
                case 10:
                    try {
                        if (userList_1_1 && !userList_1_1.done && (_a = userList_1.return)) _a.call(userList_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 11:
                    console.log("emit user new conetion", result === null || result === void 0 ? void 0 : result.user_id);
                    io.emit("conectados", result);
                    return [2 /*return*/];
            }
        });
    }); });
});
exports.default = httpServer;
