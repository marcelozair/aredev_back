"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var privateMessage_1 = require("./../controllers/privateMessage");
var Auth_1 = require("../middlewares/Auth");
var router = express_1.Router();
router.post("/enviar/:id", Auth_1.isAuthenticated, privateMessage_1.sendMessage);
exports.default = router;
