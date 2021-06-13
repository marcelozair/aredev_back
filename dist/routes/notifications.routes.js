"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var notifications_controller_1 = require("../controllers/notifications.controller");
var router = express_1.Router();
router.get("/", notifications_controller_1.getNotifications);
exports.default = router;
