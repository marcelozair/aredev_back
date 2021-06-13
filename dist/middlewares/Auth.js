"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
var config_1 = require("./../config/config");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function isAuthenticated(req, res, next) {
    var token = req.headers["token"];
    if (!token)
        return res.json({ message: "No permisos para realizar esta acción" });
    try {
        var dataToken = jsonwebtoken_1.default.verify(token, config_1.config.KEY);
        req.body.userID = dataToken.id;
        next();
    }
    catch (err) {
        return res.json({ message: "algo salio mal", error: err });
    }
}
exports.isAuthenticated = isAuthenticated;
