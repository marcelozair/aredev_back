"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_controller_1 = require("./../controllers/users.controller");
var router = express_1.Router();
router.get("/:id", users_controller_1.getUser);
exports.default = router;
