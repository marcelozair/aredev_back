"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = require("../controllers/auth.controller");
var router = express_1.Router();
router.post("/signup", auth_controller_1.signup);
router.post("/signin", auth_controller_1.signin);
router.get("/token", auth_controller_1.validatioToken);
exports.default = router;
